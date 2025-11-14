import React from 'react'
import { useNavigate } from 'react-router-dom'
import { utilities } from '../utilities'
import WhyChooseUs from '../components/WhyChooseUs'
import '../styles/Home.css'

function Home() {
  const navigate = useNavigate()

  // Lấy tất cả utilities và chọn 12 tiện ích nổi bật
  const getAllUtilities = () => {
    return Object.keys(utilities)
      .filter(id => id !== 'support') // Bỏ qua support
      .map(id => ({
        id,
        ...utilities[id].config
      }))
  }

  // Chọn 12 tiện ích nổi bật (có thể tùy chỉnh danh sách này)
  const featuredUtilityIds = [
    'url-shortener',
    'qr-generator',
    'translator',
    'ai-chat',
    'word-counter',
    'image-compress',
    'calculator',
    'currency-converter',
    'bmi-calculator',
    'text-converter',
    'image-editor',
    'ai-rewriter'
  ]

  const featuredUtilities = featuredUtilityIds
    .map(id => {
      if (utilities[id]) {
        return {
          id,
          ...utilities[id].config
        }
      }
      return null
    })
    .filter(Boolean)

  // Nếu không đủ 12, lấy thêm từ danh sách tất cả
  if (featuredUtilities.length < 12) {
    const allUtilities = getAllUtilities()
    const remaining = allUtilities
      .filter(u => !featuredUtilityIds.includes(u.id))
      .slice(0, 12 - featuredUtilities.length)
    featuredUtilities.push(...remaining)
  }

  const handleUtilityClick = (utilityId) => {
    navigate(`/utility/${utilityId}`)
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Bộ công cụ đa dạng và mạnh mẽ</h1>
          <p className="hero-subtitle">Hơn 50+ tiện ích miễn phí cho mọi nhu cầu của bạn</p>
        </div>
      </div>

      <div className="home-content">
        <div className="home-sections-top">
          <WhyChooseUs />
        </div>

        <div className="featured-utilities-section">
          <h2 className="featured-title">Tiện ích nổi bật</h2>
          <div className="featured-utilities-grid">
            {featuredUtilities.slice(0, 12).map((utility) => (
              <div
                key={utility.id}
                className="featured-utility-card"
                onClick={() => handleUtilityClick(utility.id)}
              >
                <div className="featured-utility-glow"></div>
                <div className="featured-utility-content">
                  <div className="featured-utility-icon">{utility.icon}</div>
                  <h3 className="featured-utility-title">{utility.name}</h3>
                  <p className="featured-utility-description">{utility.description}</p>
                </div>
                <div className="featured-utility-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
