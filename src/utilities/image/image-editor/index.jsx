import React, { useState, useRef } from 'react'
import '../../../styles/Utility.css'

function ImageEditor() {
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = 'edited-image.png'
      link.click()
    }
  }

  return (
    <div className="utility-container">
      <h3>Chỉnh sửa ảnh</h3>
      <div className="utility-form">
        <div className="input-group">
          <label>Chọn ảnh:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            ref={fileInputRef}
          />
        </div>

        {imageUrl && (
          <div className="image-preview">
            <img src={imageUrl} alt="Preview" />
          </div>
        )}

        <div className="button-group">
          <button onClick={() => fileInputRef.current?.click()}>
            Chọn ảnh khác
          </button>
          {imageUrl && (
            <button onClick={handleDownload}>Tải ảnh xuống</button>
          )}
        </div>

        <p className="info-text">
          💡 Tính năng chỉnh sửa ảnh nâng cao sẽ được thêm vào sau.
        </p>
      </div>
    </div>
  )
}

export default ImageEditor

