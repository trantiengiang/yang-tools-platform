import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { groupedUtilities } from '../utilities'
import '../styles/Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const grouped = groupedUtilities()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`)
    setMobileMenuOpen(false)
  }

  const handleSupportClick = () => {
    navigate('/support')
    setMobileMenuOpen(false)
  }

  const handleBrandClick = () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isSupportActive = location.pathname === '/support'

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div 
          className="navbar-brand"
          onClick={handleBrandClick}
        >
          <div className="navbar-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="navbar-title">Tiện Tích Miễn Phí</span>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          {Object.values(grouped).map((group) => {
            const category = group.category
            const isActive = location.pathname.startsWith(`/category/${category.id}`)
            return (
              <button
                key={category.id}
                className={`navbar-item ${isActive ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <span className="navbar-item-icon">{category.icon}</span>
                <span className="navbar-item-text">{category.name}</span>
              </button>
            )
          })}
          <button
            className={`navbar-item ${isSupportActive ? 'active' : ''}`}
            onClick={handleSupportClick}
          >
            <span className="navbar-item-icon">💝</span>
            <span className="navbar-item-text">Ủng hộ</span>
          </button>
          <button
            className="navbar-theme-toggle"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {Object.values(grouped).map((group) => {
            const category = group.category
            const isActive = location.pathname.startsWith(`/category/${category.id}`)
            return (
              <button
                key={category.id}
                className={`mobile-menu-item ${isActive ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <span className="mobile-menu-icon">{category.icon}</span>
                <span className="mobile-menu-text">{category.name}</span>
                <span className="mobile-menu-count">{group.items.length} tiện ích</span>
              </button>
            )
          })}
          <button
            className={`mobile-menu-item ${isSupportActive ? 'active' : ''}`}
            onClick={handleSupportClick}
          >
            <span className="mobile-menu-icon">💝</span>
            <span className="mobile-menu-text">Ủng hộ</span>
            <span className="mobile-menu-count"></span>
          </button>
          <button
            className="mobile-menu-theme-toggle"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}
          >
            <span className="mobile-menu-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            <span className="mobile-menu-text">{theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}</span>
            <span className="mobile-menu-count"></span>
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
