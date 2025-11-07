import React, { useState } from 'react'
import '../../../styles/Utility.css'

function JsonViewer() {
  const [jsonInput, setJsonInput] = useState('')
  const [jsonOutput, setJsonOutput] = useState('')
  const [error, setError] = useState('')

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e) {
      setError(`Lỗi JSON: ${e.message}`)
      setJsonOutput('')
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonOutput(JSON.stringify(parsed))
      setError('')
    } catch (e) {
      setError(`Lỗi JSON: ${e.message}`)
      setJsonOutput('')
    }
  }

  const validateJson = () => {
    try {
      JSON.parse(jsonInput)
      setError('✅ JSON hợp lệ!')
      setJsonOutput('')
    } catch (e) {
      setError(`❌ JSON không hợp lệ: ${e.message}`)
      setJsonOutput('')
    }
  }

  return (
    <div className="utility-container">
      <h3>JSON Viewer</h3>
      <div className="utility-form">
        <div className="input-group">
          <label>JSON Input:</label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"key": "value"}'
            rows="10"
          />
        </div>

        {error && (
          <div className={`error-message ${error.includes('✅') ? 'success' : ''}`}>
            {error}
          </div>
        )}

        <div className="button-group">
          <button onClick={formatJson}>Format JSON</button>
          <button onClick={minifyJson}>Minify JSON</button>
          <button onClick={validateJson}>Validate JSON</button>
        </div>

        {jsonOutput && (
          <div className="output-group">
            <label>Kết quả:</label>
            <textarea
              value={jsonOutput}
              readOnly
              rows="10"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default JsonViewer

