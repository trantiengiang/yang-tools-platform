import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getUtility, groupedUtilities } from '../utilities'
import { useTheme } from '../contexts/ThemeContext'
import WhyChooseUs from '../components/WhyChooseUs'
import Support from '../components/Support'
import '../styles/Home.css'

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { theme, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  
  // Lấy utility ID từ URL hoặc localStorage
  const getInitialUtilityId = () => {
    const urlId = searchParams.get('utility')
    if (urlId && getUtility(urlId)) {
      return urlId
    }
    const savedId = localStorage.getItem('selectedUtilityId')
    if (savedId && getUtility(savedId)) {
      return savedId
    }
    return null
  }

  const [selectedUtilityId, setSelectedUtilityId] = useState(getInitialUtilityId)

  useEffect(() => {
    // Lưu vào localStorage và URL khi thay đổi
    if (selectedUtilityId) {
      localStorage.setItem('selectedUtilityId', selectedUtilityId)
      setSearchParams({ utility: selectedUtilityId })
    } else {
      localStorage.removeItem('selectedUtilityId')
      setSearchParams({})
    }
  }, [selectedUtilityId, setSearchParams])

  const handleUtilityClick = (id) => {
    setSelectedUtilityId(id)
    // Đóng sidebar trên mobile sau khi chọn
    if (window.innerWidth <= 768) {
      setSidebarOpen(false)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => {
      const isCurrentlyExpanded = prev[categoryId] !== false
      // Nếu đang mở thì đóng, nếu đang đóng thì mở và đóng tất cả các category khác
      if (isCurrentlyExpanded) {
        // Đóng category này
        return {
          ...prev,
          [categoryId]: false
        }
      } else {
        // Mở category này và đóng tất cả các category khác
        const newState = {}
        const grouped = groupedUtilities()
        Object.keys(grouped).forEach(catId => {
          newState[catId] = catId === categoryId
        })
        return newState
      }
    })
  }

  // Auto-expand category if it contains selected utility and đóng các category khác
  useEffect(() => {
    if (selectedUtilityId && selectedUtilityId !== 'support') {
      const grouped = groupedUtilities()
      const newState = {}
      Object.keys(grouped).forEach(catId => {
        const hasSelected = grouped[catId].items.some(item => item.id === selectedUtilityId)
        newState[catId] = hasSelected
      })
      setExpandedCategories(newState)
    }
  }, [selectedUtilityId])

  const selectedUtility = selectedUtilityId ? getUtility(selectedUtilityId) : null
  const UtilityComponent = selectedUtility?.component
  const config = selectedUtility?.config
  const grouped = groupedUtilities()

  return (
    <div className="home-container">
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        title={theme === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Overlay cho mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}
      
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="sidebar-header-title">Tiện Tích Miễn Phí</span>
          <button 
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Đóng menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="sidebar-menu">
          {Object.values(grouped).map((group) => {
            // Mặc định expand tất cả, trừ khi người dùng đã đóng
            const isExpanded = expandedCategories[group.category.id] !== false
            return (
              <div key={group.category.id} className="sidebar-category">
                <div
                  className="sidebar-category-header"
                  onClick={() => toggleCategory(group.category.id)}
                >
                  <span className="category-icon">{group.category.icon}</span>
                  <span className="category-name">{group.category.name}</span>
                  <svg
                    className={`category-arrow ${isExpanded ? 'expanded' : ''}`}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {isExpanded && (
                  <div className="sidebar-category-items">
                    {group.items.map((utility) => (
                      <div
                        key={utility.id}
                        className={`sidebar-item ${selectedUtilityId === utility.id ? 'active' : ''}`}
                        onClick={() => handleUtilityClick(utility.id)}
                      >
                        <div className="sidebar-item-indicator"></div>
                        <span className="sidebar-item-text">{utility.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          
          {/* Support Section - Tách riêng */}
          <div className="sidebar-support-section">
            <div
              className={`sidebar-item support-item ${selectedUtilityId === 'support' ? 'active' : ''}`}
              onClick={() => handleUtilityClick('support')}
            >
              <div className="sidebar-item-indicator"></div>
              <span className="support-icon">❤️</span>
              <span className="sidebar-item-text">Ủng hộ</span>
            </div>
          </div>
        </div>
      </div>

      <div className="content-area">
        {selectedUtility && UtilityComponent ? (
          <div className="content-wrapper">
            <div className="content-header">
              <div className="content-header-left">
                <span className="content-icon">{config.icon}</span>
                <h1 className="content-title">{config.name}</h1>
              </div>
              <p className="content-description">{config.description}</p>
            </div>
            <div className="content-body">
              <UtilityComponent />
            </div>
          </div>
        ) : (
          <div className="content-empty">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%' }}>
              <WhyChooseUs />
              <Support />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home

