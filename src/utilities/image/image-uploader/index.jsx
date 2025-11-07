import React, { useState, useRef } from 'react'
import '../../../styles/Utility.css'

// ImgBB API Key - Đã được cấu hình sẵn
const IMGBB_API_KEY = 'ce739a5ce2b3679ebb1dd591866be88f'
const IMGBB_API_URL = 'https://api.imgbb.com/1/upload'

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Kiểm tra loại file
      if (!file.type.startsWith('image/')) {
        setError('Vui lòng chọn file ảnh!')
        return
      }

      // Kiểm tra kích thước (max 32MB cho ImgBB)
      if (file.size > 32 * 1024 * 1024) {
        setError('File quá lớn! Kích thước tối đa là 32MB')
        return
      }

      setSelectedFile(file)
      setError('')
      setImageUrl('')

      // Tạo preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Vui lòng chọn file ảnh!')
      return
    }

    setUploading(true)
    setError('')

    try {
      // Tạo FormData
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('key', IMGBB_API_KEY)

      // Upload lên ImgBB
      const response = await fetch(IMGBB_API_URL, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setImageUrl(data.data.url)
        setError('')
      } else {
        setError(data.error?.message || 'Upload thất bại! Vui lòng thử lại.')
      }
    } catch (err) {
      setError('Lỗi: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleCopyUrl = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl)
      alert('Đã copy URL vào clipboard!')
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    setPreview(null)
    setImageUrl('')
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="utility-container">
      <h3>Upload Ảnh và Lấy URL</h3>
      <div className="utility-form">
        <div className="info-box" style={{ 
          background: 'var(--bg-tertiary)', 
          border: '1px solid #0ea5e9', 
          borderRadius: '8px', 
          padding: '16px', 
          marginBottom: '20px' 
        }}>
          <p style={{ margin: '0', color: '#0369a1', fontSize: '0.95rem' }}>
            ✨ <strong>Miễn phí & Dễ dàng:</strong> Chỉ cần chọn ảnh và upload, URL sẽ được tạo tự động!
          </p>
        </div>

        <div className="input-group">
          <label>Chọn ảnh:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            ref={fileInputRef}
            style={{ padding: '8px' }}
          />
          {selectedFile && (
            <div style={{ marginTop: '12px', fontSize: '0.9rem', color: '#666' }}>
              <strong>File:</strong> {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>

        {preview && (
          <div className="image-preview image-upload-preview" style={{ marginBottom: '20px' }}>
            <img 
              src={preview} 
              alt="Preview" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '300px', 
                borderRadius: '8px',
                boxShadow: '0 2px 8px var(--shadow)'
              }} 
            />
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="button-group">
          <button 
            onClick={handleUpload} 
            disabled={uploading || !selectedFile}
            className="primary-btn"
          >
            {uploading ? 'Đang upload...' : 'Upload Ảnh'}
          </button>
          <button onClick={handleClear} disabled={uploading}>
            Xóa
          </button>
        </div>

        {imageUrl && (
          <div className="output-group" style={{ marginTop: '20px' }}>
            <label>URL Ảnh:</label>
            <div className="url-input-group" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                value={imageUrl}
                readOnly
                style={{ 
                  flex: 1, 
                  padding: '12px',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
              />
              <button 
                onClick={handleCopyUrl}
                className="primary-btn"
                style={{
                  padding: '12px 24px',
                  whiteSpace: 'nowrap'
                }}
              >
                Copy
              </button>
            </div>
            <div style={{ marginTop: '12px' }}>
              <a 
                href={imageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: '#667eea', 
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Mở ảnh trong tab mới ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUploader

