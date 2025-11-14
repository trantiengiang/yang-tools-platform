import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import Navbar from './Navbar'
import Footer from './Footer'
import '../styles/Layout.css'

function Layout({ children }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="layout">
      {/* Animated Background - chỉ hiển thị ở trang home */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        title={theme === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <Navbar />

      <main className="layout-content">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout

