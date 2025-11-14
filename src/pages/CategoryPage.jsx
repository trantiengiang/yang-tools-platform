import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { categories, groupedUtilities } from '../utilities'
import '../styles/CategoryPage.css'

function CategoryPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const grouped = groupedUtilities()
  const category = categories[categoryId]
  const categoryData = grouped[categoryId]

  if (!category || !categoryData) {
    return (
      <div className="category-page">
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
      <div className="category-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Về trang chủ
        </button>
        <div className="category-header-content">
          <div className="category-header-icon">{category.icon}</div>
          <h1 className="category-title">{category.name}</h1>
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
