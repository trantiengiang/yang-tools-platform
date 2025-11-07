import React, { useState } from 'react'
import '../../../styles/Utility.css'

function TextConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const convertToUpper = () => {
    setOutput(input.toUpperCase())
  }

  const convertToLower = () => {
    setOutput(input.toLowerCase())
  }

  const convertToTitleCase = () => {
    setOutput(
      input.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      )
    )
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="utility-container">
      <h3>Chuyển đổi văn bản</h3>
      <div className="utility-form">
        <div className="input-group">
          <label>Nhập văn bản:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập văn bản của bạn..."
            rows="6"
          />
        </div>

        <div className="button-group">
          <button onClick={convertToUpper}>CHỮ HOA</button>
          <button onClick={convertToLower}>chữ thường</button>
          <button onClick={convertToTitleCase}>Chữ Hoa Đầu Từ</button>
          <button onClick={clearAll}>Xóa tất cả</button>
        </div>

        <div className="output-group">
          <label>Kết quả:</label>
          <textarea
            value={output}
            readOnly
            placeholder="Kết quả sẽ hiển thị ở đây..."
            rows="6"
          />
        </div>
      </div>
    </div>
  )
}

export default TextConverter

