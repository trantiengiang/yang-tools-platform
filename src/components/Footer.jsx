import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Footer.css'

function Footer() {
  const navigate = useNavigate()

  const handleLinkClick = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = {
    facebook: 'https://www.facebook.com',
    youtube: 'https://www.youtube.com',
    zalo: 'https://zalo.me'
  }

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Liên kết</h3>
          <ul className="footer-links">
            <li>
              <button onClick={() => handleLinkClick('/')} className="footer-link">
                Trang chủ
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('/utility/url-shortener')} className="footer-link">
                Rút gọn Link
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('/utility/qr-generator')} className="footer-link">
                QR Code
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('/support')} className="footer-link">
                Ủng hộ
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Mạng xã hội</h3>
          <div className="footer-social">
            <button
              onClick={() => handleSocialClick(socialLinks.facebook)}
              className="social-btn facebook"
              aria-label="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button
              onClick={() => handleSocialClick(socialLinks.youtube)}
              className="social-btn youtube"
              aria-label="YouTube"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </button>
            <button
              onClick={() => handleSocialClick(socialLinks.zalo)}
              className="social-btn zalo"
              aria-label="Zalo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.39 1.32 4.8L2.05 22l5.25-1.38c1.45.79 3.08 1.23 4.74 1.23 5.46 0 9.91-4.45 9.91-9.91C22.95 6.45 18.5 2 12.04 2zm.01 18.21c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24s8.24 3.7 8.24 8.24-3.69 8.24-8.23 8.24z"/>
                <path d="M12.05 7.67c-2.26 0-4.1 1.84-4.1 4.1 0 .56.11 1.09.31 1.58l.9-1.12-.02-.01c-.11-.14-.18-.3-.18-.48 0-.48.39-.87.87-.87.48 0 .87.39.87.87 0 .18-.07.34-.18.48l-.01.01 1.12.9c.49.2 1.02.31 1.58.31 2.26 0 4.1-1.84 4.1-4.1s-1.84-4.1-4.1-4.1zm-1.58 4.1c-.48 0-.87-.39-.87-.87s.39-.87.87-.87.87.39.87.87-.39.87-.87.87zm3.16 0c-.48 0-.87-.39-.87-.87s.39-.87.87-.87.87.39.87.87-.39.87-.87.87z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="footer-section footer-about">
          <h3 className="footer-title">Tiện Tích Miễn Phí</h3>
          <p className="footer-description">
            Bộ công cụ đa dạng và mạnh mẽ cho mọi nhu cầu của bạn
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2025 Tiện Tích Miễn Phí. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

