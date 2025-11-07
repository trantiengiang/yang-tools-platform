import React from 'react'
import '../styles/Support.css'

function Support() {
  const bankInfo = {
    bank: 'MBBANK',
    accountNumber: '1520035555',
    accountHolder: 'TRAN TIEN GIANG',
    content: 'Gop Gach Xay Nha',
    qrCodeUrl: 'https://i.postimg.cc/8Py5hSFK/qr-ngan-hang.png'
  }

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    alert(`Đã copy ${label} vào clipboard!`)
  }

  return (
    <div className="support-container">
      <div className="support-header">
        <span className="support-heart">❤️</span>
        <h2 className="support-title">Ủng hộ TRAN TIEN GIANG</h2>
      </div>

      <div className="support-message">
        <p>
          Cảm ơn bạn đã sử dụng dịch vụ! Nếu bạn thấy website hữu ích, hãy ủng hộ chúng tôi để duy trì và phát triển thêm nhiều tính năng mới. Mọi đóng góp của bạn đều vô cùng ý nghĩa!
        </p>
      </div>

      <div className="support-content">
        <div className="support-qr-section">
          <div className="qr-code-wrapper">
            <img 
              src={bankInfo.qrCodeUrl} 
              alt="QR Code chuyển khoản" 
              className="qr-code-image"
            />
          </div>
        </div>

        <div className="support-info-section">
          <div className="info-header">
            <span className="bank-icon">🏦</span>
            <h3>Thông tin chuyển khoản</h3>
          </div>

          <div className="info-items">
            <InfoItem
              label="Ngân hàng"
              value={bankInfo.bank}
              onCopy={() => copyToClipboard(bankInfo.bank, 'Ngân hàng')}
            />
            <InfoItem
              label="Số tài khoản"
              value={bankInfo.accountNumber}
              onCopy={() => copyToClipboard(bankInfo.accountNumber, 'Số tài khoản')}
            />
            <InfoItem
              label="Chủ tài khoản"
              value={bankInfo.accountHolder}
              onCopy={() => copyToClipboard(bankInfo.accountHolder, 'Chủ tài khoản')}
            />
            <InfoItem
              label="Nội dung"
              value={bankInfo.content}
              onCopy={() => copyToClipboard(bankInfo.content, 'Nội dung')}
            />
          </div>
        </div>
      </div>

      <div className="support-footer">
        <span className="footer-icon">👥</span>
        <p>
          Cảm ơn bạn rất nhiều! Sự ủng hộ của bạn giúp chúng tôi duy trì và phát triển website tốt hơn.
        </p>
      </div>
    </div>
  )
}

function InfoItem({ label, value, onCopy }) {
  return (
    <div className="info-item">
      <label className="info-label">{label}:</label>
      <div className="info-value-group">
        <input
          type="text"
          value={value}
          readOnly
          className="info-input"
        />
        <button
          className="copy-button"
          onClick={onCopy}
          title="Copy"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M12 6.75V3C12 2.17157 11.3284 1.5 10.5 1.5H3C2.17157 1.5 1.5 2.17157 1.5 3V10.5C1.5 11.3284 2.17157 12 3 12H6.75M12 6.75H9C8.17157 6.75 7.5 7.42157 7.5 8.25V15C7.5 15.8284 8.17157 16.5 9 16.5H15C15.8284 16.5 16.5 15.8284 16.5 15V8.25C16.5 7.42157 15.8284 6.75 15 6.75H12M12 6.75V8.25C12 9.07843 12.6716 9.75 13.5 9.75H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Support

