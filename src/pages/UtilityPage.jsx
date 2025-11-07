import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUtility } from '../utilities'
import '../styles/UtilityPage.css'

function UtilityPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const utility = getUtility(id)

  if (!utility) {
    return (
      <div className="utility-page">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Quay lại
        </button>
        <div className="utility-content">
          <h2>Tiện ích không tồn tại</h2>
        </div>
      </div>
    )
  }

  const UtilityComponent = utility.component
  const config = utility.config

  return (
    <div className="utility-page">
      <div className="utility-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Quay lại
        </button>
        <h2>{config.name}</h2>
      </div>
      <div className="utility-content">
        <UtilityComponent />
      </div>
    </div>
  )
}

export default UtilityPage

