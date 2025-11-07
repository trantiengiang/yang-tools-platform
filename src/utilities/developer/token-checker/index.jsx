import React, { useState } from 'react'
import '../../../styles/Utility.css'

function TokenChecker() {
  const [token, setToken] = useState('')
  const [decodedData, setDecodedData] = useState(null)
  const [error, setError] = useState('')
  const [tokenType, setTokenType] = useState('auto') // auto, jwt, api

  const base64UrlDecode = (str) => {
    // Thay thế các ký tự URL-safe
    str = str.replace(/-/g, '+').replace(/_/g, '/')
    
    // Thêm padding nếu cần
    while (str.length % 4) {
      str += '='
    }
    
    try {
      // Decode base64
      const decoded = atob(str)
      return decoded
    } catch (e) {
      throw new Error('Invalid base64 encoding')
    }
  }

  const decodeJWT = (jwtToken) => {
    try {
      const parts = jwtToken.split('.')
      
      if (parts.length !== 3) {
        throw new Error('JWT token phải có 3 phần (header.payload.signature)')
      }

      const [header, payload, signature] = parts

      // Decode header
      const decodedHeader = JSON.parse(base64UrlDecode(header))
      
      // Decode payload
      const decodedPayload = JSON.parse(base64UrlDecode(payload))

      // Kiểm tra expiration nếu có
      let isExpired = false
      let expiresAt = null
      if (decodedPayload.exp) {
        expiresAt = new Date(decodedPayload.exp * 1000)
        isExpired = expiresAt < new Date()
      }

      return {
        header: decodedHeader,
        payload: decodedPayload,
        signature: signature,
        isExpired,
        expiresAt,
        isValid: true
      }
    } catch (error) {
      throw new Error('Lỗi decode JWT: ' + error.message)
    }
  }

  const analyzeToken = (tokenValue) => {
    // Kiểm tra xem có phải JWT không (có 3 phần cách nhau bởi dấu chấm)
    const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
    
    if (jwtPattern.test(tokenValue.trim())) {
      return 'jwt'
    }
    
    // Kiểm tra xem có phải base64 không
    try {
      atob(tokenValue.trim())
      return 'base64'
    } catch {
      return 'text'
    }
  }

  const handleCheck = () => {
    if (!token.trim()) {
      setError('Vui lòng nhập token!')
      setDecodedData(null)
      return
    }

    setError('')
    setDecodedData(null)

    try {
      const detectedType = tokenType === 'auto' ? analyzeToken(token) : tokenType

      if (detectedType === 'jwt' || tokenType === 'jwt') {
        const decoded = decodeJWT(token.trim())
        setDecodedData({
          type: 'jwt',
          ...decoded
        })
      } else if (detectedType === 'base64' || tokenType === 'base64') {
        try {
          const decoded = base64UrlDecode(token.trim())
          setDecodedData({
            type: 'base64',
            decoded: decoded,
            isValid: true
          })
        } catch (e) {
          throw new Error('Không thể decode base64: ' + e.message)
        }
      } else {
        // Text token - chỉ hiển thị thông tin cơ bản
        setDecodedData({
          type: 'text',
          length: token.length,
          preview: token.length > 100 ? token.substring(0, 100) + '...' : token,
          isValid: true
        })
      }
    } catch (err) {
      setError(err.message)
      setDecodedData(null)
    }
  }

  const handleClear = () => {
    setToken('')
    setDecodedData(null)
    setError('')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Đã copy vào clipboard!')
  }

  const formatJSON = (obj) => {
    return JSON.stringify(obj, null, 2)
  }

  return (
    <div className="utility-container">
      <h3>Check Token</h3>
      <div className="utility-form">
        <div className="info-box" style={{ 
          background: 'var(--bg-tertiary)', 
          border: '1px solid #0ea5e9', 
          borderRadius: '8px', 
          padding: '16px', 
          marginBottom: '20px' 
        }}>
          <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            🔑 <strong>Hỗ trợ:</strong> JWT Token, Base64, API Token. Tự động phát hiện loại token.
          </p>
        </div>

        <div className="input-group">
          <label>Loại token:</label>
          <select 
            value={tokenType} 
            onChange={(e) => setTokenType(e.target.value)}
            style={{ marginBottom: '12px' }}
          >
            <option value="auto">Tự động phát hiện</option>
            <option value="jwt">JWT Token</option>
            <option value="base64">Base64</option>
            <option value="text">Text/API Token</option>
          </select>
        </div>

        <div className="input-group">
          <label>Nhập token:</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            rows="6"
            style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
          />
          <small style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '4px' }}>
            Dán token của bạn vào đây (JWT, Base64, hoặc API token)
          </small>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="button-group">
          <button 
            onClick={handleCheck} 
            disabled={!token.trim()}
            className="primary-btn"
          >
            Kiểm tra Token
          </button>
          <button onClick={handleClear}>
            Xóa
          </button>
        </div>

        {decodedData && (
          <div style={{ 
            marginTop: '30px',
            padding: '24px',
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 2px 8px var(--shadow)'
          }}>
            <h4 style={{ 
              margin: '0 0 20px 0', 
              color: 'var(--text-primary)',
              fontSize: '1.3rem',
              borderBottom: '2px solid var(--border-color)',
              paddingBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📋 Kết quả phân tích
              {decodedData.type === 'jwt' && decodedData.isExpired && (
                <span style={{ 
                  fontSize: '0.8rem', 
                  color: '#ef4444',
                  fontWeight: 'normal',
                  marginLeft: 'auto'
                }}>
                  ⚠️ Token đã hết hạn
                </span>
              )}
              {decodedData.type === 'jwt' && !decodedData.isExpired && decodedData.expiresAt && (
                <span style={{ 
                  fontSize: '0.8rem', 
                  color: '#10b981',
                  fontWeight: 'normal',
                  marginLeft: 'auto'
                }}>
                  ✅ Token còn hiệu lực
                </span>
              )}
            </h4>

            {decodedData.type === 'jwt' && (
              <>
                {/* Header */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <label style={{ 
                      fontWeight: 600, 
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem'
                    }}>
                      Header:
                    </label>
                    <button
                      onClick={() => copyToClipboard(formatJSON(decodedData.header))}
                      style={{
                        padding: '4px 12px',
                        background: 'transparent',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  <textarea
                    value={formatJSON(decodedData.header)}
                    readOnly
                    rows="6"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid var(--border-color)',
                      borderRadius: '8px',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Payload */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <label style={{ 
                      fontWeight: 600, 
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem'
                    }}>
                      Payload:
                    </label>
                    <button
                      onClick={() => copyToClipboard(formatJSON(decodedData.payload))}
                      style={{
                        padding: '4px 12px',
                        background: 'transparent',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  <textarea
                    value={formatJSON(decodedData.payload)}
                    readOnly
                    rows="10"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid var(--border-color)',
                      borderRadius: '8px',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Signature */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    fontWeight: 600, 
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Signature:
                  </label>
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px',
                    alignItems: 'center'
                  }}>
                    <input
                      type="text"
                      value={decodedData.signature}
                      readOnly
                      style={{
                        flex: 1,
                        padding: '12px',
                        border: '2px solid var(--border-color)',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <button
                      onClick={() => copyToClipboard(decodedData.signature)}
                      style={{
                        padding: '12px 20px',
                        background: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Token Info */}
                <div style={{
                  padding: '16px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ 
                    fontWeight: 600, 
                    color: 'var(--text-secondary)',
                    marginBottom: '12px'
                  }}>
                    Thông tin Token:
                  </div>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                    fontSize: '0.9rem'
                  }}>
                    {decodedData.payload.iat && (
                      <div>
                        <span style={{ color: 'var(--text-tertiary)' }}>Issued At: </span>
                        <span style={{ color: 'var(--text-primary)' }}>
                          {new Date(decodedData.payload.iat * 1000).toLocaleString('vi-VN')}
                        </span>
                      </div>
                    )}
                    {decodedData.expiresAt && (
                      <div>
                        <span style={{ color: 'var(--text-tertiary)' }}>Expires At: </span>
                        <span style={{ 
                          color: decodedData.isExpired ? '#ef4444' : 'var(--text-primary)'
                        }}>
                          {decodedData.expiresAt.toLocaleString('vi-VN')}
                        </span>
                      </div>
                    )}
                    {decodedData.payload.iss && (
                      <div>
                        <span style={{ color: 'var(--text-tertiary)' }}>Issuer: </span>
                        <span style={{ color: 'var(--text-primary)' }}>{decodedData.payload.iss}</span>
                      </div>
                    )}
                    {decodedData.payload.sub && (
                      <div>
                        <span style={{ color: 'var(--text-tertiary)' }}>Subject: </span>
                        <span style={{ color: 'var(--text-primary)' }}>{decodedData.payload.sub}</span>
                      </div>
                    )}
                    {decodedData.header.alg && (
                      <div>
                        <span style={{ color: 'var(--text-tertiary)' }}>Algorithm: </span>
                        <span style={{ color: 'var(--text-primary)' }}>{decodedData.header.alg}</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {decodedData.type === 'base64' && (
              <div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <label style={{ 
                    fontWeight: 600, 
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem'
                  }}>
                    Decoded Base64:
                  </label>
                  <button
                    onClick={() => copyToClipboard(decodedData.decoded)}
                    style={{
                      padding: '4px 12px',
                      background: 'transparent',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    Copy
                  </button>
                </div>
                <textarea
                  value={decodedData.decoded}
                  readOnly
                  rows="8"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    resize: 'vertical'
                  }}
                />
              </div>
            )}

            {decodedData.type === 'text' && (
              <div>
                <div style={{
                  padding: '16px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: 'var(--text-tertiary)' }}>Độ dài: </span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                      {decodedData.length} ký tự
                    </span>
                  </div>
                  <div>
                    <div style={{ 
                      color: 'var(--text-tertiary)',
                      marginBottom: '8px',
                      fontSize: '0.9rem'
                    }}>
                      Preview:
                    </div>
                    <div style={{
                      padding: '12px',
                      background: 'var(--bg-secondary)',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      wordBreak: 'break-all'
                    }}>
                      {decodedData.preview}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TokenChecker

