import React, { useState } from 'react'
import '../../../styles/Utility.css'

function ApiTester() {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState('GET')
  const [headers, setHeaders] = useState('')
  const [body, setBody] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleApiCall = async () => {
    if (!url) {
      alert('Vui lòng nhập URL')
      return
    }

    setLoading(true)
    setResponse('')

    try {
      const options = {
        method: method,
        headers: {}
      }

      // Parse headers
      if (headers) {
        const headerLines = headers.split('\n')
        headerLines.forEach(line => {
          const [key, value] = line.split(':').map(s => s.trim())
          if (key && value) {
            options.headers[key] = value
          }
        })
      }

      // Add body for POST, PUT, PATCH
      if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
        options.body = body
        if (!options.headers['Content-Type']) {
          options.headers['Content-Type'] = 'application/json'
        }
      }

      const res = await fetch(url, options)
      const data = await res.text()
      
      setResponse(JSON.stringify({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        body: data
      }, null, 2))
    } catch (error) {
      setResponse(JSON.stringify({
        error: error.message
      }, null, 2))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="utility-container">
      <h3>Test API</h3>
      <div className="utility-form">
        <div className="input-group">
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/endpoint"
          />
        </div>

        <div className="input-group">
          <label>Method:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>

        <div className="input-group">
          <label>Headers (mỗi dòng một header, format: Key: Value):</label>
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder="Content-Type: application/json&#10;Authorization: Bearer token"
            rows="4"
          />
        </div>

        {['POST', 'PUT', 'PATCH'].includes(method) && (
          <div className="input-group">
            <label>Body:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key": "value"}'
              rows="6"
            />
          </div>
        )}

        <button 
          className="primary-btn" 
          onClick={handleApiCall}
          disabled={loading}
        >
          {loading ? 'Đang gọi...' : 'Gọi API'}
        </button>

        <div className="output-group">
          <label>Response:</label>
          <textarea
            value={response}
            readOnly
            placeholder="Response sẽ hiển thị ở đây..."
            rows="12"
          />
        </div>
      </div>
    </div>
  )
}

export default ApiTester

