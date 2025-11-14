import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import '../styles/Layout.css'

function Layout({ children }) {
  return (
    <div className="layout">
      {/* Animated Background - chỉ hiển thị ở trang home */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <Navbar />

      <main className="layout-content">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout
