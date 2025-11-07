import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import '../../../styles/Utility.css'

function QRGenerator() {
  const [qrType, setQrType] = useState('url')
  const [qrData, setQrData] = useState('')
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [smsNumber, setSmsNumber] = useState('')
  const [smsContent, setSmsContent] = useState('')
  const [wifiName, setWifiName] = useState('')
  const [wifiPassword, setWifiPassword] = useState('')
  const [wifiSecurity, setWifiSecurity] = useState('WPA')
  const [text, setText] = useState('')
  const [size, setSize] = useState(256)

  const generateQRData = () => {
    switch (qrType) {
      case 'url':
        return url || 'https://example.com'
      case 'email':
        return email ? `mailto:${email}` : 'mailto:email@example.com'
      case 'phone':
        return phone ? `tel:${phone}` : 'tel:+84123456789'
      case 'sms':
        const smsNum = smsNumber || '+84123456789'
        const smsText = smsContent || 'Nội dung'
        return `smsto:${smsNum}:${smsText}`
      case 'wifi':
        const ssid = wifiName || 'TênMạng'
        const pass = wifiPassword || 'MậtKhẩu'
        return `WIFI:T:${wifiSecurity};S:${ssid};P:${pass};;`
      case 'text':
        return text || 'Nhập văn bản của bạn'
      default:
        return ''
    }
  }

  const qrValue = generateQRData()

  const handleDownload = () => {
    // Tạo SVG element từ QRCode
    const svgElement = document.querySelector('#qr-code-container svg')
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      canvas.width = size
      canvas.height = size
      
      img.onload = () => {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.download = `qr-code-${qrType}-${Date.now()}.png`
          link.href = url
          link.click()
          URL.revokeObjectURL(url)
        })
      }
      
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue)
    alert('Đã copy dữ liệu QR vào clipboard!')
  }

  return (
    <div className="utility-container">
      <h3>Tạo QR Code</h3>
      <div className="utility-form">
        <div className="input-group">
          <label>Loại QR Code:</label>
          <select value={qrType} onChange={(e) => setQrType(e.target.value)}>
            <option value="url">URL / Website</option>
            <option value="email">Email</option>
            <option value="phone">Điện thoại</option>
            <option value="sms">SMS</option>
            <option value="wifi">WiFi</option>
            <option value="text">Văn bản</option>
          </select>
        </div>

        {/* URL Input */}
        {qrType === 'url' && (
          <div className="input-group">
            <label>URL:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        )}

        {/* Email Input */}
        {qrType === 'email' && (
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
          </div>
        )}

        {/* Phone Input */}
        {qrType === 'phone' && (
          <div className="input-group">
            <label>Số điện thoại:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+84123456789"
            />
          </div>
        )}

        {/* SMS Input */}
        {qrType === 'sms' && (
          <>
            <div className="input-group">
              <label>Số điện thoại:</label>
              <input
                type="tel"
                value={smsNumber}
                onChange={(e) => setSmsNumber(e.target.value)}
                placeholder="+84123456789"
              />
            </div>
            <div className="input-group">
              <label>Nội dung SMS:</label>
              <textarea
                value={smsContent}
                onChange={(e) => setSmsContent(e.target.value)}
                placeholder="Nội dung tin nhắn"
                rows="3"
              />
            </div>
          </>
        )}

        {/* WiFi Input */}
        {qrType === 'wifi' && (
          <>
            <div className="input-group">
              <label>Loại bảo mật:</label>
              <select value={wifiSecurity} onChange={(e) => setWifiSecurity(e.target.value)}>
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Không mật khẩu</option>
              </select>
            </div>
            <div className="input-group">
              <label>Tên mạng WiFi (SSID):</label>
              <input
                type="text"
                value={wifiName}
                onChange={(e) => setWifiName(e.target.value)}
                placeholder="TênMạng"
              />
            </div>
            <div className="input-group">
              <label>Mật khẩu:</label>
              <input
                type="password"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                placeholder="MậtKhẩu"
              />
            </div>
          </>
        )}

        {/* Text Input */}
        {qrType === 'text' && (
          <div className="input-group">
            <label>Văn bản:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Nhập văn bản của bạn..."
              rows="6"
            />
          </div>
        )}

        <div className="input-group">
          <label>Kích thước QR Code:</label>
          <input
            type="range"
            min="128"
            max="512"
            step="32"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
          />
          <div className="qr-size-label" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
            <span>128px</span>
            <span><strong>{size}px</strong></span>
            <span>512px</span>
          </div>
        </div>

        {qrValue && (
          <div className="qr-result-container" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '20px',
            marginTop: '20px',
            padding: '30px',
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            boxShadow: '0 2px 8px var(--shadow)'
          }}>
            <div 
              id="qr-code-container"
              style={{ 
                padding: '20px', 
                background: 'var(--bg-secondary)', 
                borderRadius: '8px',
                border: '2px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <QRCodeSVG
                value={qrValue}
                size={size}
                level="H"
                includeMargin={true}
              />
            </div>
            
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <div className="output-group">
                <label>Dữ liệu QR Code:</label>
                <textarea
                  value={qrValue}
                  readOnly
                  rows="3"
                  style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div className="button-group" style={{ width: '100%', maxWidth: '400px' }}>
              <button onClick={handleDownload} className="primary-btn">
                Tải QR Code
              </button>
              <button onClick={handleCopy}>
                Copy Dữ liệu
              </button>
            </div>
          </div>
        )}

        {!qrValue && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: 'var(--text-tertiary)',
            background: 'var(--bg-tertiary)',
            borderRadius: '8px',
            marginTop: '20px'
          }}>
            <p>Nhập thông tin ở trên để tạo QR Code</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QRGenerator

