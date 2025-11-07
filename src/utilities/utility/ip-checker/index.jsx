import React, { useState, useEffect } from 'react'
import '../../../styles/Utility.css'

function IpChecker() {
  const [myIp, setMyIp] = useState('')
  const [ipToCheck, setIpToCheck] = useState('')
  const [ipInfo, setIpInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loadingMyIp, setLoadingMyIp] = useState(true)

  // Lấy IP của người dùng khi component mount
  useEffect(() => {
    fetchMyIp()
  }, [])

  const fetchMyIp = async () => {
    setLoadingMyIp(true)
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      setMyIp(data.ip)
    } catch (err) {
      setError('Không thể lấy IP của bạn')
    } finally {
      setLoadingMyIp(false)
    }
  }

  const validateIp = (ip) => {
    // IPv4 regex
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
    // IPv6 regex (simplified)
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/
    
    return ipv4Regex.test(ip) || ipv6Regex.test(ip)
  }

  const checkIp = async (ip) => {
    if (!ip) {
      setError('Vui lòng nhập địa chỉ IP!')
      return
    }

    if (!validateIp(ip)) {
      setError('Địa chỉ IP không hợp lệ!')
      return
    }

    setLoading(true)
    setError('')
    setIpInfo(null)

    try {
      // Sử dụng ip-api.com (miễn phí, không cần API key)
      // Lưu ý: API này có giới hạn 45 requests/phút từ cùng một IP
      const response = await fetch(`https://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`)
      const data = await response.json()

      if (data.status === 'success') {
        setIpInfo(data)
        setError('')
      } else {
        setError(data.message || 'Không thể lấy thông tin IP')
      }
    } catch (err) {
      setError('Lỗi: ' + err.message + '. Vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  const handleCheckMyIp = () => {
    if (myIp) {
      checkIp(myIp)
    }
  }

  const handleCheckInputIp = () => {
    checkIp(ipToCheck)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleCheckInputIp()
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Đã copy vào clipboard!')
  }

  return (
    <div className="utility-container">
      <h3>Check IP</h3>
      <div className="utility-form">
        <div className="info-box" style={{ 
          background: 'var(--bg-tertiary)', 
          border: '1px solid #0ea5e9', 
          borderRadius: '8px', 
          padding: '16px', 
          marginBottom: '20px' 
        }}>
          <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            🌐 <strong>Miễn phí:</strong> Kiểm tra địa chỉ IP và thông tin chi tiết về vị trí, ISP, timezone...
          </p>
        </div>

        {/* My IP Section */}
        <div style={{ 
          padding: '20px', 
          background: 'var(--bg-tertiary)', 
          borderRadius: '12px',
          marginBottom: '20px',
          border: '1px solid var(--border-color)'
        }}>
          <label style={{ display: 'block', marginBottom: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            IP của bạn:
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            {loadingMyIp ? (
              <span style={{ color: 'var(--text-tertiary)' }}>Đang lấy IP...</span>
            ) : (
              <>
                <input
                  type="text"
                  value={myIp}
                  readOnly
                  style={{
                    flex: 1,
                    minWidth: '150px',
                    padding: '12px',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontWeight: '600'
                  }}
                />
                <button
                  onClick={() => copyToClipboard(myIp)}
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
                <button
                  onClick={handleCheckMyIp}
                  className="primary-btn"
                  disabled={loading || !myIp}
                >
                  Kiểm tra
                </button>
              </>
            )}
          </div>
        </div>

        {/* Check Other IP */}
        <div className="input-group">
          <label>Kiểm tra IP khác:</label>
          <input
            type="text"
            value={ipToCheck}
            onChange={(e) => setIpToCheck(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="192.168.1.1 hoặc 2001:0db8:85a3:0000:0000:8a2e:0370:7334"
            disabled={loading}
          />
          <small style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '4px' }}>
            Nhập địa chỉ IPv4 hoặc IPv6
          </small>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="button-group">
          <button 
            onClick={handleCheckInputIp} 
            disabled={loading || !ipToCheck.trim()}
            className="primary-btn"
          >
            {loading ? 'Đang kiểm tra...' : 'Kiểm tra IP'}
          </button>
          <button onClick={() => setIpToCheck('')} disabled={loading}>
            Xóa
          </button>
        </div>

        {/* IP Info Display */}
        {ipInfo && (
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
              paddingBottom: '12px'
            }}>
              📍 Thông tin IP
            </h4>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              <InfoItem label="Địa chỉ IP" value={ipInfo.query} copyable />
              <InfoItem label="Quốc gia" value={`${ipInfo.country} (${ipInfo.countryCode})`} />
              <InfoItem label="Khu vực" value={ipInfo.regionName || 'N/A'} />
              <InfoItem label="Thành phố" value={ipInfo.city || 'N/A'} />
              <InfoItem label="Mã bưu điện" value={ipInfo.zip || 'N/A'} />
              <InfoItem label="Múi giờ" value={ipInfo.timezone || 'N/A'} />
              <InfoItem label="ISP" value={ipInfo.isp || 'N/A'} />
              <InfoItem label="Tổ chức" value={ipInfo.org || 'N/A'} />
              <InfoItem label="AS Number" value={ipInfo.as || 'N/A'} />
              {ipInfo.lat && ipInfo.lon && (
                <InfoItem 
                  label="Tọa độ" 
                  value={`${ipInfo.lat}, ${ipInfo.lon}`}
                  copyable
                  link={`https://www.google.com/maps?q=${ipInfo.lat},${ipInfo.lon}`}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Component con để hiển thị thông tin
function InfoItem({ label, value, copyable = false, link }) {
  return (
    <div style={{
      padding: '12px',
      background: 'var(--bg-tertiary)',
      borderRadius: '8px',
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ 
        fontSize: '0.85rem', 
        color: 'var(--text-tertiary)',
        marginBottom: '6px',
        fontWeight: '500'
      }}>
        {label}:
      </div>
      <div style={{ 
        fontSize: '1rem', 
        color: 'var(--text-primary)',
        wordBreak: 'break-word',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {link ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#667eea', 
              textDecoration: 'none',
              flex: 1
            }}
          >
            {value} ↗
          </a>
        ) : (
          <span style={{ flex: 1 }}>{value}</span>
        )}
        {copyable && (
          <button
            onClick={() => {
              navigator.clipboard.writeText(value)
              alert('Đã copy!')
            }}
            style={{
              padding: '4px 8px',
              background: 'transparent',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap'
            }}
            title="Copy"
          >
            📋
          </button>
        )}
      </div>
    </div>
  )
}

export default IpChecker

