import React, { useState } from 'react'
import '../../../styles/Utility.css'

function WordCounter() {
  const [text, setText] = useState('')

  // Tính toán các thống kê
  const getStats = () => {
    if (!text) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0
      }
    }

    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(word => word.length > 0).length
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
    const lines = text.split('\n').length

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines
    }
  }

  const stats = getStats()

  const handleClear = () => {
    setText('')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    alert('Đã copy văn bản vào clipboard!')
  }

  return (
    <div className="utility-container">
      <div className="word-counter-wrapper">
        <div className="word-counter-input-section">
          <div className="input-group">
            <label>Nhập văn bản:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Nhập hoặc dán văn bản của bạn vào đây để đếm từ và ký tự..."
              rows="12"
              className="word-counter-textarea"
            />
          </div>

          <div className="button-group">
            <button onClick={handleClear} className="button-secondary">
              Xóa
            </button>
            <button onClick={handleCopy} className="button-secondary">
              Copy
            </button>
          </div>
        </div>

        <div className="word-counter-stats-section">
          <h3 className="stats-title">Thống kê</h3>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🔤</div>
              <div className="stat-content">
                <div className="stat-label">Ký tự (có khoảng trắng)</div>
                <div className="stat-value">{stats.characters.toLocaleString()}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✍️</div>
              <div className="stat-content">
                <div className="stat-label">Ký tự (không khoảng trắng)</div>
                <div className="stat-value">{stats.charactersNoSpaces.toLocaleString()}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <div className="stat-label">Số từ</div>
                <div className="stat-value">{stats.words.toLocaleString()}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💬</div>
              <div className="stat-content">
                <div className="stat-label">Số câu</div>
                <div className="stat-value">{stats.sentences.toLocaleString()}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📄</div>
              <div className="stat-content">
                <div className="stat-label">Số đoạn</div>
                <div className="stat-value">{stats.paragraphs.toLocaleString()}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📏</div>
              <div className="stat-content">
                <div className="stat-label">Số dòng</div>
                <div className="stat-value">{stats.lines.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordCounter

