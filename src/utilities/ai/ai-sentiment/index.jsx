import React, { useState } from 'react'
import '../../../styles/Utility.css'

function AISentiment() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState('openai')

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

  const handleAnalyze = async () => {
    if (!text.trim()) {
      alert('Vui lòng nhập văn bản cần phân tích')
      return
    }

    const config = getApiConfig()
    if (!config.key) {
      alert(`API key cho ${provider === 'openai' ? 'OpenAI' : provider === 'groq' ? 'Groq' : 'Gemini'} chưa được cấu hình trong file .env`)
      return
    }

    setLoading(true)
    setResult('')

    const prompt = `Phân tích cảm xúc của văn bản sau và trả về kết quả theo định dạng:
    - Cảm xúc: [Tích cực/Tiêu cực/Trung tính]
    - Điểm số: [0-100]
    - Giải thích: [Lý do]

    Văn bản: "${text}"`

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
            temperature: 0.3
          }),
          signal: controller.signal
        })
      }

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Lỗi ${response.status}`)
      }

      const data = await response.json()
      let analysis = ''
      if (provider === 'gemini') {
        analysis = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
      } else {
        analysis = data.choices?.[0]?.message?.content || ''
      }

      setResult(analysis)
    } catch (error) {
      alert(`Lỗi: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    alert('Đã copy vào clipboard!')
  }

  return (
    <div className="utility-container">
      <h3>AI Phân Tích Cảm Xúc</h3>
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
          <label>Văn bản cần phân tích:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nhập văn bản cần phân tích cảm xúc..."
            rows="6"
          />
        </div>

        <div className="button-group">
          <button onClick={handleAnalyze} disabled={loading || !text.trim()}>
            {loading ? 'Đang phân tích...' : 'Phân tích cảm xúc'}
          </button>
        </div>

        {result && (
          <div className="input-group">
            <label>
              Kết quả phân tích:
              <button 
                onClick={handleCopy}
                style={{ marginLeft: '10px', padding: '5px 10px', fontSize: '0.85rem' }}
              >
                Copy
              </button>
            </label>
            <textarea
              value={result}
              readOnly
              rows="8"
              style={{ background: 'var(--bg-tertiary)' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AISentiment
