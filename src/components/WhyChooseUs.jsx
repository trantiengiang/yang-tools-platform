import React from 'react'
import '../styles/WhyChooseUs.css'

function WhyChooseUs() {
  const features = [
    {
      icon: '🎁',
      title: 'Miễn phí 100%',
      description: 'Tất cả công cụ đều miễn phí sử dụng'
    },
    {
      icon: '⚡',
      title: 'Nhanh chóng',
      description: 'Xử lý tức thì, không cần chờ đợi'
    },
    {
      icon: '🛡️',
      title: 'An toàn',
      description: 'Dữ liệu được bảo mật tối đa'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Hoạt động tốt trên mọi thiết bị'
    }
  ]

  return (
    <div className="why-choose-us">
      <div className="why-choose-us-header">
        <span className="header-icon">⭐</span>
        <h2 className="header-title">Tại sao chọn chúng tôi?</h2>
      </div>
      <div className="why-choose-us-content">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyChooseUs

