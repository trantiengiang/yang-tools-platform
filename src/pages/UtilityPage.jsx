import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUtility, getCategoryId } from '../utilities'
import '../styles/UtilityPage.css'

function UtilityPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const utility = getUtility(id)
  const categoryId = getCategoryId(id)

  if (!utility) {
    return (
      <div className="utility-page">
        <div className="utility-content">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Về trang chủ
          </button>
          <h2>Tiện ích không tồn tại</h2>
        </div>
      </div>
    )
  }

  const UtilityComponent = utility.component
  const config = utility.config

  const handleBack = () => {
    if (categoryId) {
      navigate(`/category/${categoryId}`)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="utility-page">
      <div className="utility-header">
        <button className="back-btn" onClick={handleBack}>
          ← Quay lại
        </button>
        <div className="utility-header-content">
          <div className="utility-header-icon">{config.icon}</div>
          <div>
            <h1 className="utility-title">{config.name}</h1>
            <p className="utility-description">{config.description}</p>
          </div>
        </div>
      </div>

      <div className="utility-content">
        <UtilityComponent />
      </div>
    </div>
  )
}

export default UtilityPage
