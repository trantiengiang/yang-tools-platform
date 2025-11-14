import React from 'react'
import Support from '../components/Support'
import '../styles/SupportPage.css'

function SupportPage() {
  return (
    <div className="support-page">
      <div className="support-page-header">
        <h1 className="support-page-title">Ủng hộ dự án</h1>
        <p className="support-page-subtitle">Giúp chúng tôi duy trì và phát triển nền tảng này</p>
      </div>
      <div className="support-page-content">
        <Support />
      </div>
    </div>
  )
}

export default SupportPage

