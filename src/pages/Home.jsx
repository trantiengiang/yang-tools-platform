import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { categories, groupedUtilities } from '../utilities'
import WhyChooseUs from '../components/WhyChooseUs'
import Support from '../components/Support'
import Footer from '../components/Footer'
import '../styles/Home.css'

function Home() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const grouped = groupedUtilities()

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`)
  }

  return (
    <div className="home-page">
      {/* Animated Background */}
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

      <div className="home-header">
        <div className="home-header-content">
          <div className="home-logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="home-title">Tiện Tích Miễn Phí</h1>
          <p className="home-subtitle">Bộ công cụ đa dạng và mạnh mẽ cho mọi nhu cầu của bạn</p>
        </div>
      </div>

      <div className="home-content">
        <div className="home-sections-top">
          <WhyChooseUs />
        </div>

        <div className="categories-grid">
          {Object.values(grouped).map((group) => {
            const category = group.category
            const itemCount = group.items.length
            return (
              <div
                key={category.id}
                className="category-card"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="category-card-glow"></div>
                <div className="category-card-content">
                  <div className="category-card-icon">{category.icon}</div>
                  <h2 className="category-card-title">{category.name}</h2>
                  <p className="category-card-count">{itemCount} tiện ích</p>
                </div>
                <div className="category-card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            )
          })}
        </div>

        <div className="home-sections-bottom">
          <Support />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
