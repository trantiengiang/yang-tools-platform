import React, { useState } from 'react'
import '../../../styles/Utility.css'

function CodeFormatter() {
  const [code, setCode] = useState('')
  const [formattedCode, setFormattedCode] = useState('')
  const [language, setLanguage] = useState('javascript')

  const formatCode = () => {
    try {
      if (language === 'json') {
        const parsed = JSON.parse(code)
        setFormattedCode(JSON.stringify(parsed, null, 2))
      } else {
        // Basic formatting - có thể tích hợp prettier sau
        setFormattedCode(code)
      }
    } catch (error) {
      setFormattedCode(`Lỗi: ${error.message}`)
    }
  }

  const minifyCode = () => {
    if (language === 'json') {
      try {
        const parsed = JSON.parse(code)
        setFormattedCode(JSON.stringify(parsed))
      } catch (error) {
        setFormattedCode(`Lỗi: ${error.message}`)
      }
    } else {
      setFormattedCode(code.replace(/\s+/g, ' ').trim())
    }
  }

  return (
    <div className="utility-container">
      <h3>Format code</h3>
      <div className="utility-form">
        <div className="input-group">
          <label>Ngôn ngữ:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="json">JSON</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </div>

        <div className="input-group">
          <label>Code:</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Nhập code của bạn..."
            rows="10"
          />
        </div>

        <div className="button-group">
          <button onClick={formatCode}>Format</button>
          <button onClick={minifyCode}>Minify</button>
        </div>

        <div className="output-group">
          <label>Kết quả:</label>
          <textarea
            value={formattedCode}
            readOnly
            placeholder="Code đã format sẽ hiển thị ở đây..."
            rows="10"
          />
        </div>
      </div>
    </div>
  )
}

export default CodeFormatter

