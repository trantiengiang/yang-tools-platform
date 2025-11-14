import React, { useState } from 'react'
import '../../../styles/Utility.css'

function AISeowriter() {
  const [keyword, setKeyword] = useState('')
  const [topic, setTopic] = useState('')
  const [seoContent, setSeoContent] = useState('')
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

  const handleGenerate = async () => {
    if (!keyword.trim() || !topic.trim()) {
      alert('Vui lòng nhập từ khóa và chủ đề')
      return
    }

    const config = getApiConfig()
    if (!config.key) {
      alert(`API key cho ${provider === 'openai' ? 'OpenAI' : provider === 'groq' ? 'Groq' : 'Gemini'} chưa được cấu hình trong file .env`)
      return
    }

    setLoading(true)
    setSeoContent('')

    const prompt = `Viết một bài viết SEO về chủ đề "${topic}" với từ khóa chính "${keyword}". 
    Bài viết cần:
    - Tối ưu SEO với từ khóa "${keyword}"
    - Cấu trúc rõ ràng với các heading
    - Nội dung hữu ích và hấp dẫn
    - Độ dài khoảng 500-800 từ
    - Sử dụng từ khóa một cách tự nhiên`

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

      setSeoContent(result)
    } catch (error) {
      alert(`Lỗi: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(seoContent)
    alert('Đã copy vào clipboard!')
  }

  return (
    <div className="utility-container">
      <h3>AI SEO Writer</h3>
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
          <label>Từ khóa SEO:</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Ví dụ: công cụ AI miễn phí"
          />
        </div>

        <div className="input-group">
          <label>Chủ đề:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ví dụ: Công cụ AI cho doanh nghiệp"
          />
        </div>

        <div className="button-group">
          <button onClick={handleGenerate} disabled={loading || !keyword.trim() || !topic.trim()}>
            {loading ? 'Đang tạo nội dung...' : 'Tạo nội dung SEO'}
          </button>
        </div>

        {seoContent && (
          <div className="input-group">
            <label>
              Nội dung SEO:
              <button 
                onClick={handleCopy}
                style={{ marginLeft: '10px', padding: '5px 10px', fontSize: '0.85rem' }}
              >
                Copy
              </button>
            </label>
            <textarea
              value={seoContent}
              readOnly
              rows="15"
              style={{ background: 'var(--bg-tertiary)' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AISeowriter
