import React, { useState } from 'react'
import '../../../styles/Utility.css'

function UrlShortener() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('urlShortenerHistory')
    return saved ? JSON.parse(saved) : []
  })

  const validateUrl = (url) => {
    try {
      // Thêm http:// nếu không có protocol
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url
      }
      new URL(url)
      return url
    } catch {
      return null
    }
  }

  const shortenUrl = async () => {
    if (!longUrl.trim()) {
      setError('Vui lòng nhập URL!')
      return
    }

    const validUrl = validateUrl(longUrl.trim())
    if (!validUrl) {
      setError('URL không hợp lệ! Vui lòng nhập URL đúng định dạng.')
      return
    }

    setLoading(true)
    setError('')
    setShortUrl('')

    try {
      // Sử dụng TinyURL API (miễn phí, không cần API key)
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(validUrl)}`)
      
      if (!response.ok) {
        throw new Error('Không thể rút gọn URL')
      }

      const shortLink = await response.text()
      
      if (shortLink && shortLink.startsWith('http')) {
        setShortUrl(shortLink)
        
        // Lưu vào lịch sử
        const newHistory = [
          { longUrl: validUrl, shortUrl: shortLink, createdAt: new Date().toISOString() },
          ...history.slice(0, 9) // Giữ tối đa 10 items
        ]
        setHistory(newHistory)
        localStorage.setItem('urlShortenerHistory', JSON.stringify(newHistory))
        setError('')
      } else {
        throw new Error('Phản hồi không hợp lệ từ server')
      }
    } catch (err) {
      setError('Lỗi: ' + err.message + '. Vui lòng thử lại!')
      setShortUrl('')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url)
    alert('Đã copy link vào clipboard!')
  }

  const handleClear = () => {
    setLongUrl('')
    setShortUrl('')
    setError('')
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('urlShortenerHistory')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      shortenUrl()
    }
  }

  return (
    <div className="utility-container">
      <h3>Rút gọn Link</h3>
      <div className="utility-form">
        <div className="info-box" style={{ 
          background: 'var(--bg-tertiary)', 
          border: '1px solid #0ea5e9', 
          borderRadius: '8px', 
          padding: '16px', 
          marginBottom: '20px' 
        }}>
          <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            ✨ <strong>Miễn phí:</strong> Rút gọn URL dài thành link ngắn gọn, dễ chia sẻ!
          </p>
        </div>

        <div className="input-group">
          <label>Nhập URL cần rút gọn:</label>
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="https://example.com/very/long/url..."
            disabled={loading}
          />
          <small style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '4px' }}>
            Có thể nhập URL có hoặc không có http:// hoặc https://
          </small>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="button-group">
          <button 
            onClick={shortenUrl} 
            disabled={loading || !longUrl.trim()}
            className="primary-btn"
          >
            {loading ? 'Đang rút gọn...' : 'Rút gọn Link'}
          </button>
          <button onClick={handleClear} disabled={loading}>
            Xóa
          </button>
        </div>

        {shortUrl && (
          <div className="output-group" style={{ marginTop: '20px' }}>
            <label>Link đã rút gọn:</label>
            <div className="url-input-group" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                value={shortUrl}
                readOnly
                style={{ 
                  flex: 1, 
                  padding: '12px',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
              />
              <button 
                onClick={() => handleCopy(shortUrl)}
                className="primary-btn"
                style={{
                  padding: '12px 24px',
                  whiteSpace: 'nowrap'
                }}
              >
                Copy
              </button>
            </div>
            <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
              <a 
                href={shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: '#667eea', 
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.9rem'
                }}
              >
                Mở link ↗
              </a>
              <span style={{ color: 'var(--text-tertiary)' }}>|</span>
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                Link gốc: <a href={longUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea' }}>{longUrl.length > 50 ? longUrl.substring(0, 50) + '...' : longUrl}</a>
              </span>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ margin: 0, fontWeight: 600, color: 'var(--text-secondary)' }}>Lịch sử:</label>
              <button 
                onClick={clearHistory}
                style={{
                  padding: '6px 12px',
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'var(--bg-tertiary)'
                  e.target.style.color = 'var(--text-secondary)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.color = 'var(--text-tertiary)'
                }}
              >
                Xóa lịch sử
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {history.map((item, index) => (
                <div 
                  key={index}
                  style={{
                    padding: '12px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        value={item.shortUrl}
                        readOnly
                        style={{
                          flex: 1,
                          minWidth: '200px',
                          padding: '8px',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px',
                          fontFamily: 'monospace',
                          fontSize: '0.85rem',
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-primary)'
                        }}
                      />
                      <button
                        onClick={() => handleCopy(item.shortUrl)}
                        style={{
                          padding: '8px 16px',
                          background: '#667eea',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Copy
                      </button>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                      {item.longUrl.length > 60 ? item.longUrl.substring(0, 60) + '...' : item.longUrl}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UrlShortener

