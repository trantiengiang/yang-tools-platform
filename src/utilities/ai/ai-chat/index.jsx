import React, { useState } from 'react'
import '../../../styles/Utility.css'

function AiChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState('openai')
  
  // Lấy API keys từ .env
  const groqKey = import.meta.env.VITE_GROQ_API_KEY || ''
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY || ''
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || ''

  // Kiểm tra API key có sẵn
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
          model: 'llama-3.3-70b-versatile', // Updated model
          key: groqKey
        }
      case 'gemini':
        return {
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          model: 'gemini-1.5-flash', // Updated model
          key: geminiKey
        }
      case 'openai':
      default:
        return {
          url: 'https://api.openai.com/v1/chat/completions',
          model: 'gpt-3.5-turbo',
          key: openaiKey
        }
    }
  }

  const sendMessage = async () => {
    if (!input.trim()) {
      alert('Vui lòng nhập tin nhắn')
      return
    }

    const config = getApiConfig()
    if (!config.key) {
      alert(`API key cho ${provider === 'openai' ? 'OpenAI' : provider === 'groq' ? 'Groq' : 'Gemini'} chưa được cấu hình trong file .env`)
      return
    }

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 60000)

      let response
      let requestBody

      if (provider === 'gemini') {
        // Gemini API format - include conversation history
        const conversationHistory = messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
        
        requestBody = {
          contents: [
            ...conversationHistory,
            {
              role: 'user',
              parts: [{ text: input }]
            }
          ]
        }
        response = await fetch(config.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal
        })
      } else {
        // OpenAI/Groq format
        requestBody = {
          model: config.model,
          messages: [...messages, userMessage],
          temperature: 0.7
        }
        response = await fetch(config.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.key}`
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal
        })
      }

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: response.statusText } }))
        throw new Error(errorData.error?.message || `Lỗi ${response.status}`)
      }

      const data = await response.json()

      let aiResponse = ''
      if (provider === 'gemini') {
        aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi'
      } else {
        aiResponse = data.choices?.[0]?.message?.content || 'Không có phản hồi'
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse 
      }])
    } catch (error) {
      let errorMessage = error.message || 'Lỗi không xác định'
      if (error.name === 'AbortError') {
        errorMessage = 'Kết nối bị timeout. Vui lòng thử lại.'
      }
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `❌ ${errorMessage}` 
      }])
    } finally {
      setLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="utility-container">
      <h3>Chat AI</h3>
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

        <div className="chat-messages">
          {messages.length === 0 ? (
            <p className="empty-message">Chưa có tin nhắn nào. Hãy bắt đầu trò chuyện!</p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <strong>{msg.role === 'user' ? 'Bạn' : 'AI'}:</strong>
                <p>{msg.content}</p>
              </div>
            ))
          )}
          {loading && <p className="loading">Đang suy nghĩ...</p>}
        </div>

        <div className="chat-input-group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Nhập tin nhắn của bạn..."
            rows="3"
          />
          <div className="button-group">
            <button onClick={sendMessage} disabled={loading}>
              Gửi
            </button>
            <button onClick={clearChat}>Xóa chat</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiChat
