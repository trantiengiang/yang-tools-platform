/**
 * Template component cho utility mới
 * Copy file này và chỉnh sửa theo nhu cầu
 */
import React, { useState } from 'react'
import '../../styles/Utility.css'

function UtilityTemplate() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleProcess = () => {
    // Xử lý logic của bạn ở đây
    setOutput(input)
  }

  return (
    <div className="utility-container">
      <h3>Tên Tiện Ích</h3>
      <div className="utility-form">
        <div className="input-group">
          <label>Input:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập dữ liệu..."
            rows="6"
          />
        </div>

        <div className="button-group">
          <button onClick={handleProcess}>Xử lý</button>
        </div>

        <div className="output-group">
          <label>Output:</label>
          <textarea
            value={output}
            readOnly
            placeholder="Kết quả..."
            rows="6"
          />
        </div>
      </div>
    </div>
  )
}

export default UtilityTemplate

