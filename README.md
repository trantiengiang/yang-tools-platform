# 🛠️ Bộ Tiện Ích (Utility Tools)

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> Ứng dụng web đa tiện ích được xây dựng bằng React, cung cấp hơn 50+ công cụ hữu ích cho công việc hàng ngày. Từ xử lý văn bản, chỉnh sửa ảnh, đến các công cụ developer và AI.

## ✨ Tính năng

### 📝 **Xử lý Văn bản**
- Chuyển đổi định dạng văn bản
- Đếm từ và ký tự
- Dịch thuật
- Chia tách và gộp văn bản
- Chuyển đổi font chữ
- Tóm tắt văn bản
- Chuyển văn bản thành file
- Kiểm tra chính tả
- Tạo slogan
- Xử lý dấu tiếng Việt

### 🖼️ **Xử lý Hình ảnh**
- Chỉnh sửa ảnh
- Upload và lưu trữ ảnh
- Tạo và đọc QR Code
- Quét OCR (Optical Character Recognition)
- Chuyển đổi Base64
- Nén ảnh
- Chuyển đổi định dạng ảnh
- Thêm watermark
- Tạo icon
- Tạo gradient
- Xử lý ảnh bằng AI

### 💻 **Developer Tools**
- Format code
- Test API
- Xem JSON
- Kiểm tra token
- Minify code
- Tạo UUID
- Encode/Decode
- Test Regex
- So sánh diff
- Ping DNS
- Tạo dữ liệu giả

### 🔧 **Tiện ích**
- Rút gọn URL
- Kiểm tra IP
- Lịch (Dương lịch & Âm lịch)
- Hẹn giờ/Đếm ngược
- Chuyển đổi tiền tệ
- Chuyển đổi múi giờ
- Tính chênh lệch ngày
- Máy tính
- Chuyển đổi đơn vị
- Kiểm tra domain
- Ghi chú nhanh

### 🏥 **Sức khỏe**
- Theo dõi chu kỳ kinh nguyệt
- Tính BMI (Body Mass Index)
- Tính BMR (Basal Metabolic Rate)
- Tính lượng nước cần uống
- Tính lượng calo đốt cháy

### 🤖 **AI Tools**
- Chat AI
- Viết lại nội dung
- Tóm tắt PDF
- Tạo ý tưởng nội dung
- Text to Speech
- Tạo ảnh bằng AI
- Phân tích cảm xúc
- Viết nội dung SEO

## 🚀 Bắt đầu

### Yêu cầu hệ thống

- Node.js >= 16.x
- npm >= 7.x hoặc yarn >= 1.22.x

### Cài đặt

1. **Clone repository**

```bash
git clone https://github.com/your-username/tool-nghich.git
cd tool-nghich
```

2. **Cài đặt dependencies**

```bash
npm install
```

3. **Chạy ứng dụng**

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173` (hoặc port khác nếu 5173 đã được sử dụng)

### Build cho Production

```bash
npm run build
```

Build files sẽ được tạo trong thư mục `dist/`

### Preview Production Build

```bash
npm run preview
```

## 📁 Cấu trúc dự án

```
tool-nghich/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── Support.jsx
│   │   └── WhyChooseUs.jsx
│   ├── contexts/           # React contexts
│   │   └── ThemeContext.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Trang chủ
│   │   └── UtilityPage.jsx # Trang utility
│   ├── styles/             # Global styles
│   │   ├── Home.css
│   │   ├── Utility.css
│   │   ├── UtilityPage.css
│   │   ├── Support.css
│   │   └── WhyChooseUs.css
│   ├── utilities/          # Utility tools
│   │   ├── index.js        # Utility registry
│   │   ├── _template/      # Template cho utility mới
│   │   ├── ai/             # AI tools
│   │   ├── developer/      # Developer tools
│   │   ├── health/         # Health tools
│   │   ├── image/          # Image tools
│   │   ├── text/           # Text tools
│   │   ├── utility/        # Utility tools
│   │   └── support/        # Support page
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   └── routes.js           # Route configuration
├── .gitignore
├── index.html
├── package.json
├── vite.config.js          # Vite configuration
└── README.md
```

## 🏗️ Kiến trúc

### Cấu trúc Utility

Mỗi utility được tổ chức trong thư mục riêng với cấu trúc:

```
utility-name/
├── config.js      # Cấu hình (id, name, icon, description, category)
└── index.jsx      # Component chính
```

### File config.js

```javascript
export default {
  id: 'utility-id',
  name: 'Tên Utility',
  icon: '🔧',
  description: 'Mô tả ngắn gọn về utility',
  category: 'category-name' // text, image, developer, utility, health, ai
}
```

### Component Structure

```javascript
import React from 'react'
import '../../../styles/Utility.css'

function MyUtility() {
  return (
    <div className="utility-container">
      <div className="utility-form">
        {/* Your utility code here */}
      </div>
    </div>
  )
}

export default MyUtility
```

## 📝 Thêm Utility Mới

### Bước 1: Tạo thư mục và files

Tạo thư mục mới trong thư mục category tương ứng:

```bash
src/utilities/[category]/my-utility/
├── config.js
└── index.jsx
```

### Bước 2: Tạo file config.js

```javascript
// src/utilities/[category]/my-utility/config.js
export default {
  id: 'my-utility',
  name: 'Tên Utility',
  icon: '🔧',
  description: 'Mô tả utility của bạn'
}
```

### Bước 3: Tạo component

```javascript
// src/utilities/[category]/my-utility/index.jsx
import React from 'react'
import '../../../styles/Utility.css'

function MyUtility() {
  return (
    <div className="utility-container">
      <div className="utility-form">
        {/* Your code here */}
      </div>
    </div>
  )
}

export default MyUtility
```

### Bước 4: Đăng ký utility

Thêm vào `src/utilities/index.js`:

```javascript
// Import
import MyUtility from './[category]/my-utility'
import MyUtilityConfig from './[category]/my-utility/config'

// Export trong object utilities
'my-utility': {
  component: MyUtility,
  config: MyUtilityConfig
}
```

Utility sẽ tự động xuất hiện trên trang chủ trong category tương ứng!

## 🎨 Customization

### Theme

Ứng dụng hỗ trợ dark/light theme. Theme context được quản lý trong `src/contexts/ThemeContext.jsx`.

### Styling

- Global styles: `src/styles/Utility.css`
- Component styles: Có thể tạo file CSS riêng trong thư mục utility
- Responsive: Đã được tối ưu cho mobile và desktop

## 🛠️ Công nghệ sử dụng

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.0
- **Routing**: React Router DOM 6.20.0
- **QR Code**: qrcode.react 3.1.0
- **Language**: JavaScript (ES6+)
- **Styling**: CSS3

## 📦 Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Preview production build

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Guidelines

- Follow code style hiện có
- Thêm comments cho code phức tạp
- Test utility mới trước khi submit
- Update README nếu cần

## 📄 License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 👤 Tác giả

**Your Name**

- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com

## 🙏 Lời cảm ơn

- React team cho framework tuyệt vời
- Vite team cho build tool nhanh chóng
- Tất cả contributors và users của dự án

## 📞 Liên hệ

Nếu có bất kỳ câu hỏi hoặc đề xuất nào, vui lòng:

- Mở một [Issue](https://github.com/your-username/tool-nghich/issues)
- Gửi email đến: your.email@example.com

---

⭐ Nếu bạn thấy dự án này hữu ích, hãy cho một star!
