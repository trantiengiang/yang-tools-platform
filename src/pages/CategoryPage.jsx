import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { categories, groupedUtilities, getUtility } from '../utilities'
import { useTheme } from '../contexts/ThemeContext'
import '../styles/CategoryPage.css'

function CategoryPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const grouped = groupedUtilities()
  const category = categories[categoryId]
  const categoryData = grouped[categoryId]

  if (!category || !categoryData) {
    return (
      <div className="category-page">
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          title={theme === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <div className="category-content">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Về trang chủ
          </button>
          <h2>Danh mục không tồn tại</h2>
        </div>
      </div>
    )
  }

  const handleUtilityClick = (utilityId) => {
    navigate(`/utility/${utilityId}`)
  }

  return (
    <div className="category-page">
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        title={theme === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <div className="category-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Về trang chủ
        </button>
        <div className="category-header-content">
          <div className="category-header-icon">{category.icon}</div>
          <div>
            <h1 className="category-title">{category.name}</h1>
            <p className="category-subtitle">{categoryData.items.length} tiện ích có sẵn</p>
          </div>
        </div>
      </div>

      <div className="category-content">
        <div className="utilities-grid">
          {categoryData.items.map((utility) => (
            <div
              key={utility.id}
              className="utility-card"
              onClick={() => handleUtilityClick(utility.id)}
            >
              <div className="utility-card-icon">{utility.icon}</div>
              <h3 className="utility-card-title">{utility.name}</h3>
              <p className="utility-card-description">{utility.description}</p>
              <div className="utility-card-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage

