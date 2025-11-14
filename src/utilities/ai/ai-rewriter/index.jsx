import React, { useState } from 'react'
import '../../../styles/Utility.css'

function AIRewriter() {
  const [text, setText] = useState('')
  const [rewritten, setRewritten] = useState('')
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState('openai')
  const [tone, setTone] = useState('professional')

  const groqKey = import.meta.env.VITE_GROQ_API_KEY || ''
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY || ''
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || ''

  const hasApiKey = () => {
    switch (provider) {
      case 'openai':
        return !!openaiKey
      case 'groq':
        return !!groqKey
      case 'gemini':
        return !!geminiKey
      default:
        return false
    }
  }

  const getApiConfig = () => {
    switch (provider) {
      case 'groq':
        return {
          url: 'https://api.groq.com/openai/v1/chat/completions',
          model: 'llama-3.3-70b-versatile',
          key: groqKey
        }
      case 'gemini':
        return {
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          model: 'gemini-1.5-flash',
          key: geminiKey
        }
      default:
        return {
          url: 'https://api.openai.com/v1/chat/completions',
          model: 'gpt-3.5-turbo',
          key: openaiKey
        }
    }
  }

  const handleRewrite = async () => {
    if (!text.trim()) {
      alert('Vui lòng nhập văn bản cần viết lại')
      return
    }

    const config = getApiConfig()
    if (!config.key) {
      alert(`API key cho ${provider === 'openai' ? 'OpenAI' : provider === 'groq' ? 'Groq' : 'Gemini'} chưa được cấu hình trong file .env`)
      return
    }

    setLoading(true)
    setRewritten('')

    const tonePrompts = {
      professional: 'viết lại một cách chuyên nghiệp',
      casual: 'viết lại một cách thân thiện, gần gũi',
      formal: 'viết lại một cách trang trọng',
      creative: 'viết lại một cách sáng tạo, hấp dẫn'
    }

    const prompt = `Hãy ${tonePrompts[tone]}: "${text}"`

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 60000)

      let response
      if (provider === 'gemini') {
        response = await fetch(config.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }]
          }),
          signal: controller.signal
        })
      } else {
        response = await fetch(config.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.key}`
          },
          body: JSON.stringify({
            model: config.model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
          }),
          signal: controller.signal
        })
      }

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Lỗi ${response.status}`)
      }

      const data = await response.json()
      let result = ''
      if (provider === 'gemini') {
        result = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
      } else {
        result = data.choices?.[0]?.message?.content || ''
      }

      setRewritten(result)
    } catch (error) {
      alert(`Lỗi: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(rewritten)
    alert('Đã copy vào clipboard!')
  }

  return (
    <div className="utility-container">
      <h3>AI Viết Lại Văn Bản</h3>
      <div className="utility-form">
        <div className="input-group">
          <label>Provider:</label>
          <select 
            value={provider} 
            onChange={(e) => setProvider(e.target.value)}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          >
            <option value="openai">OpenAI GPT</option>
            <option value="groq">Groq</option>
            <option value="gemini">Google Gemini</option>
          </select>
        </div>

        {!hasApiKey() && (
          <div className="input-group" style={{ padding: '12px', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
            <p style={{ margin: 0, color: '#856404', fontSize: '0.9rem' }}>
              ⚠️ API key cho {provider === 'openai' ? 'OpenAI' : provider === 'groq' ? 'Groq' : 'Gemini'} chưa được cấu hình trong file .env
            </p>
          </div>
        )}

        <div className="input-group">
          <label>Giọng điệu:</label>
          <select 
            value={tone} 
            onChange={(e) => setTone(e.target.value)}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          >
            <option value="professional">Chuyên nghiệp</option>
            <option value="casual">Thân thiện</option>
            <option value="formal">Trang trọng</option>
            <option value="creative">Sáng tạo</option>
          </select>
        </div>

        <div className="input-group">
          <label>Văn bản gốc:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nhập văn bản cần viết lại..."
            rows="6"
          />
        </div>

        <div className="button-group">
          <button onClick={handleRewrite} disabled={loading || !text.trim()}>
            {loading ? 'Đang xử lý...' : 'Viết lại'}
          </button>
        </div>

        {rewritten && (
          <div className="input-group">
            <label>
              Kết quả:
              <button 
                onClick={handleCopy}
                style={{ marginLeft: '10px', padding: '5px 10px', fontSize: '0.85rem' }}
              >
                Copy
              </button>
            </label>
            <textarea
              value={rewritten}
              readOnly
              rows="6"
              style={{ background: 'var(--bg-tertiary)' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AIRewriter
