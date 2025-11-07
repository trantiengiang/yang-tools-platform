import React, { useState } from 'react'
import '../../../styles/Utility.css'

function AiChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [apiUrl, setApiUrl] = useState('https://api.openai.com/v1/chat/completions')

  const sendMessage = async () => {
    if (!input.trim() || !apiKey) {
      alert('Vui lòng nhập message và API key')
      return
    }

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Tạo AbortController để có thể timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 seconds timeout

      let response
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [...messages, userMessage],
            temperature: 0.7
          }),
          signal: controller.signal
        })
        clearTimeout(timeoutId)
      } catch (fetchError) {
        clearTimeout(timeoutId)
        if (fetchError.name === 'AbortError') {
          throw new Error('Kết nối bị timeout. Vui lòng thử lại sau hoặc kiểm tra kết nối internet/VPN của bạn.')
        } else if (fetchError.message.includes('Failed to fetch') || fetchError.message.includes('NetworkError')) {
          throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet hoặc VPN của bạn.')
        } else {
          throw fetchError
        }
      }

      // Đọc response body (chỉ đọc một lần)
      let responseText
      try {
        responseText = await response.text()
        if (!responseText) {
          throw new Error('Response trống từ server')
        }
      } catch (readError) {
        throw new Error('Không thể đọc response từ server. Vui lòng kiểm tra kết nối.')
      }

      // Kiểm tra response status
      if (!response.ok) {
        let errorMessage = `Lỗi ${response.status}: ${response.statusText}`
        try {
          const errorData = JSON.parse(responseText)
          if (errorData.error && errorData.error.message) {
            errorMessage = errorData.error.message
          } else if (errorData.message) {
            errorMessage = errorData.message
          }
        } catch (e) {
          // Nếu không parse được JSON, sử dụng text response
          if (responseText) {
            errorMessage += ` - ${responseText.substring(0, 200)}`
          }
        }
        throw new Error(errorMessage)
      }

      // Parse JSON response
      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        throw new Error('Lỗi serialization: Server trả về dữ liệu không hợp lệ. Vui lòng kiểm tra API URL và format của response.')
      }
      
      // Kiểm tra lỗi từ API response
      if (data.error) {
        const errorMsg = data.error.message || data.error.code || 'Lỗi không xác định từ API'
        throw new Error(errorMsg)
      }

      // Kiểm tra cấu trúc response hợp lệ
      if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
        throw new Error('Response không đúng định dạng: thiếu choices array')
      }

      if (!data.choices[0].message || !data.choices[0].message.content) {
        throw new Error('Response không đúng định dạng: thiếu message content')
      }

      // Thành công - thêm message vào chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.choices[0].message.content 
      }])
    } catch (error) {
      // Xử lý các loại lỗi khác nhau
      let errorMessage = error.message || 'Lỗi không xác định'
      
      // Kiểm tra các lỗi network phổ biến
      if (errorMessage.includes('Failed to fetch') || 
          errorMessage.includes('NetworkError') ||
          errorMessage.includes('Network request failed')) {
        errorMessage = 'Kết nối thất bại. Nếu vấn đề vẫn tiếp tục, vui lòng kiểm tra kết nối internet hoặc VPN của bạn.'
      } else if (errorMessage.includes('CORS') || errorMessage.includes('CORS policy')) {
        errorMessage = 'Lỗi CORS: API server không cho phép truy cập từ trình duyệt này. Vui lòng kiểm tra cấu hình CORS của API server.'
      } else if (errorMessage.includes('serialization') || errorMessage.includes('JSON')) {
        errorMessage = 'Lỗi serialization: Dữ liệu từ server không hợp lệ. Vui lòng kiểm tra API URL và đảm bảo server trả về JSON hợp lệ.'
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
          <label>API URL:</label>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="https://api.openai.com/v1/chat/completions"
          />
        </div>

        <div className="input-group">
          <label>API Key:</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Nhập API key của bạn"
          />
        </div>

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

