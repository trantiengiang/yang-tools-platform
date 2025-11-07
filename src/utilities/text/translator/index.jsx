import React, { useState } from 'react'
import '../../../styles/Utility.css'
import './Translator.css'

function Translator() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [sourceLang, setSourceLang] = useState('auto')
  const [targetLang, setTargetLang] = useState('vi')
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState('')

  const languages = [
    { code: 'auto', name: 'Tự động phát hiện' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文 (Chinese)' },
    { code: 'ja', name: '日本語 (Japanese)' },
    { code: 'ko', name: '한국어 (Korean)' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' },
    { code: 'th', name: 'ไทย' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'it', name: 'Italiano' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'pl', name: 'Polski' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'sv', name: 'Svenska' }
  ]

  const translateText = async () => {
    if (!inputText.trim()) {
      setError('Vui lòng nhập văn bản cần dịch')
      return
    }

    setIsTranslating(true)
    setError('')
    setOutputText('')

    try {
      // Sử dụng MyMemory Translation API (miễn phí)
      const sourceLangCode = sourceLang === 'auto' ? 'auto' : sourceLang
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLangCode}|${targetLang}`
      
      const response = await fetch(url)
      const data = await response.json()

      if (data.responseStatus === 200 && data.responseData) {
        setOutputText(data.responseData.translatedText)
        // Nếu auto-detect, cập nhật sourceLang với ngôn ngữ được phát hiện
        if (sourceLang === 'auto' && data.responseData.detectedSourceLanguage) {
          const detectedLang = data.responseData.detectedSourceLanguage
          const langObj = languages.find(l => l.code === detectedLang)
          if (langObj) {
            // Có thể hiển thị thông báo ngôn ngữ được phát hiện
          }
        }
      } else {
        throw new Error('Không thể dịch văn bản. Vui lòng thử lại.')
      }
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi dịch. Vui lòng thử lại.')
      console.error('Translation error:', err)
    } finally {
      setIsTranslating(false)
    }
  }

  const handleSwapLanguages = () => {
    if (sourceLang === 'auto') {
      // Nếu đang dùng auto, không thể swap
      return
    }
    const temp = sourceLang
    setSourceLang(targetLang)
    setTargetLang(temp)
    // Swap text
    const tempText = inputText
    setInputText(outputText)
    setOutputText(tempText)
  }

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text)
    alert(`Đã copy ${type === 'input' ? 'văn bản gốc' : 'văn bản dịch'} vào clipboard!`)
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
    setError('')
  }

  const getLanguageName = (code) => {
    const lang = languages.find(l => l.code === code)
    return lang ? lang.name : code
  }

  return (
    <div className="utility-container">
      <div className="translator-wrapper">
        {/* Language Selection */}
        <div className="translator-lang-selector">
          <div className="lang-select-group">
            <label>Từ ngôn ngữ:</label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="lang-select"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSwapLanguages}
            className="swap-btn"
            title="Đổi ngược ngôn ngữ"
            disabled={sourceLang === 'auto'}
          >
            ⇄
          </button>

          <div className="lang-select-group">
            <label>Sang ngôn ngữ:</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="lang-select"
            >
              {languages.filter(l => l.code !== 'auto').map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Translation Area */}
        <div className="translator-content">
          <div className="translator-input-section">
            <div className="translator-header">
              <span className="section-label">
                {sourceLang === 'auto' ? 'Văn bản gốc' : getLanguageName(sourceLang)}
              </span>
              <div className="header-actions">
                <button
                  onClick={() => handleCopy(inputText, 'input')}
                  className="icon-btn"
                  title="Copy"
                  disabled={!inputText}
                >
                  📋
                </button>
                <button
                  onClick={() => setInputText('')}
                  className="icon-btn"
                  title="Xóa"
                  disabled={!inputText}
                >
                  ✕
                </button>
              </div>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập văn bản cần dịch..."
              className="translator-textarea"
              rows="10"
            />
            <div className="char-count">{inputText.length} ký tự</div>
          </div>

          <div className="translator-output-section">
            <div className="translator-header">
              <span className="section-label">{getLanguageName(targetLang)}</span>
              <div className="header-actions">
                <button
                  onClick={() => handleCopy(outputText, 'output')}
                  className="icon-btn"
                  title="Copy"
                  disabled={!outputText}
                >
                  📋
                </button>
              </div>
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder={isTranslating ? 'Đang dịch...' : 'Kết quả dịch sẽ hiển thị ở đây...'}
              className="translator-textarea output"
              rows="10"
            />
            {outputText && <div className="char-count">{outputText.length} ký tự</div>}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="translator-actions">
          <button
            onClick={translateText}
            className="translate-btn"
            disabled={isTranslating || !inputText.trim()}
          >
            {isTranslating ? '⏳ Đang dịch...' : '🌐 Dịch'}
          </button>
          <button
            onClick={handleClear}
            className="clear-btn"
            disabled={!inputText && !outputText}
          >
            🗑️ Xóa
          </button>
        </div>
      </div>
    </div>
  )
}

export default Translator

