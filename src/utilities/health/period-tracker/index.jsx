import React, { useState, useEffect } from 'react'
import '../../../styles/Utility.css'
import './PeriodTracker.css'

function PeriodTracker() {
  const [lastPeriodDate, setLastPeriodDate] = useState('')
  const [cycleLength, setCycleLength] = useState(28)
  const [periodLength, setPeriodLength] = useState(5)
  const [predictions, setPredictions] = useState([])
  const [nextPeriodDate, setNextPeriodDate] = useState(null)
  const [fertileWindow, setFertileWindow] = useState(null)

  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  const weekDaysFull = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
  const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
                  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

  useEffect(() => {
    if (lastPeriodDate) {
      calculatePredictions()
    }
  }, [lastPeriodDate, cycleLength, periodLength])

  const calculatePredictions = () => {
    if (!lastPeriodDate) return

    const startDate = new Date(lastPeriodDate)
    const predictionsList = []
    
    // Tính toán 6 chu kỳ tiếp theo
    for (let i = 1; i <= 6; i++) {
      const periodStart = new Date(startDate)
      periodStart.setDate(periodStart.getDate() + (cycleLength * i))
      
      const periodEnd = new Date(periodStart)
      periodEnd.setDate(periodEnd.getDate() + (periodLength - 1))
      
      // Cửa sổ thụ thai (ovulation window) thường là 5 ngày trước và sau ngày rụng trứng
      // Ngày rụng trứng thường là 14 ngày trước chu kỳ tiếp theo
      const ovulationDate = new Date(periodStart)
      ovulationDate.setDate(ovulationDate.getDate() - 14)
      
      const fertileStart = new Date(ovulationDate)
      fertileStart.setDate(fertileStart.getDate() - 5)
      
      const fertileEnd = new Date(ovulationDate)
      fertileEnd.setDate(fertileEnd.getDate() + 1)

      predictionsList.push({
        cycle: i,
        periodStart: new Date(periodStart),
        periodEnd: new Date(periodEnd),
        ovulationDate: new Date(ovulationDate),
        fertileStart: new Date(fertileStart),
        fertileEnd: new Date(fertileEnd)
      })
    }

    setPredictions(predictionsList)
    
    // Ngày tới tiếp theo
    if (predictionsList.length > 0) {
      setNextPeriodDate(predictionsList[0].periodStart)
      
      // Cửa sổ thụ thai của chu kỳ tiếp theo
      setFertileWindow({
        start: predictionsList[0].fertileStart,
        end: predictionsList[0].fertileEnd,
        ovulation: predictionsList[0].ovulationDate
      })
    }
  }

  const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    const day = d.getDate()
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    const dayOfWeek = weekDaysFull[d.getDay()]
    return `${day}/${month}/${year} (${dayOfWeek})`
  }

  const formatDateShort = (date) => {
    if (!date) return ''
    const d = new Date(date)
    const day = d.getDate()
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
  }

  const getDaysUntil = (date) => {
    if (!date) return null
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const targetDate = new Date(date)
    targetDate.setHours(0, 0, 0, 0)
    const diffTime = targetDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleCalculate = () => {
    if (!lastPeriodDate) {
      alert('Vui lòng nhập ngày bắt đầu chu kỳ gần nhất')
      return
    }
    calculatePredictions()
  }

  const handleClear = () => {
    setLastPeriodDate('')
    setCycleLength(28)
    setPeriodLength(5)
    setPredictions([])
    setNextPeriodDate(null)
    setFertileWindow(null)
  }

  const daysUntilNext = nextPeriodDate ? getDaysUntil(nextPeriodDate) : null

  return (
    <div className="utility-container">
      <div className="period-tracker-wrapper">
        {/* Input Form */}
        <div className="period-input-section">
          <h3 className="section-title">📅 Thông tin chu kỳ</h3>
          
          <div className="input-row">
            <div className="input-group">
              <label>Ngày bắt đầu chu kỳ gần nhất:</label>
              <input
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
                className="date-input"
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Độ dài chu kỳ (ngày):</label>
              <div className="range-input-group">
                <input
                  type="range"
                  min="21"
                  max="35"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(parseInt(e.target.value))}
                  className="range-input"
                />
                <span className="range-value">{cycleLength} ngày</span>
              </div>
              <div className="range-hint">
                <span>21 ngày</span>
                <span>35 ngày</span>
              </div>
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Độ dài chu kỳ kinh (ngày):</label>
              <div className="range-input-group">
                <input
                  type="range"
                  min="3"
                  max="7"
                  value={periodLength}
                  onChange={(e) => setPeriodLength(parseInt(e.target.value))}
                  className="range-input"
                />
                <span className="range-value">{periodLength} ngày</span>
              </div>
              <div className="range-hint">
                <span>3 ngày</span>
                <span>7 ngày</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={handleCalculate} className="calculate-btn">
              🔄 Tính toán
            </button>
            <button onClick={handleClear} className="clear-btn">
              🗑️ Xóa
            </button>
          </div>
        </div>

        {/* Next Period Info */}
        {nextPeriodDate && (
          <div className="next-period-info">
            <div className="info-card primary">
              <div className="info-icon">📆</div>
              <div className="info-content">
                <div className="info-label">Chu kỳ tiếp theo dự kiến</div>
                <div className="info-value">{formatDate(nextPeriodDate)}</div>
                {daysUntilNext !== null && (
                  <div className="info-days">
                    {daysUntilNext > 0 
                      ? `Còn ${daysUntilNext} ngày nữa` 
                      : daysUntilNext === 0 
                      ? 'Hôm nay' 
                      : `Đã qua ${Math.abs(daysUntilNext)} ngày`}
                  </div>
                )}
              </div>
            </div>

            {fertileWindow && (
              <div className="info-card secondary">
                <div className="info-icon">🌺</div>
                <div className="info-content">
                  <div className="info-label">Cửa sổ thụ thai</div>
                  <div className="info-value">
                    {formatDateShort(fertileWindow.start)} - {formatDateShort(fertileWindow.end)}
                  </div>
                  <div className="info-subtext">
                    Ngày rụng trứng: {formatDateShort(fertileWindow.ovulation)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Predictions List */}
        {predictions.length > 0 && (
          <div className="predictions-section">
            <h3 className="section-title">📋 Dự đoán các chu kỳ tiếp theo</h3>
            <div className="predictions-list">
              {predictions.map((pred, index) => {
                const daysUntil = getDaysUntil(pred.periodStart)
                return (
                  <div key={index} className="prediction-card">
                    <div className="prediction-header">
                      <span className="cycle-number">Chu kỳ {pred.cycle}</span>
                      {daysUntil !== null && (
                        <span className={`days-badge ${daysUntil <= 7 ? 'soon' : ''}`}>
                          {daysUntil > 0 
                            ? `${daysUntil} ngày nữa` 
                            : daysUntil === 0 
                            ? 'Hôm nay' 
                            : `Đã qua ${Math.abs(daysUntil)} ngày`}
                        </span>
                      )}
                    </div>
                    <div className="prediction-details">
                      <div className="detail-item">
                        <span className="detail-label">📅 Bắt đầu:</span>
                        <span className="detail-value">{formatDate(pred.periodStart)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">📅 Kết thúc:</span>
                        <span className="detail-value">{formatDate(pred.periodEnd)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">🌺 Rụng trứng:</span>
                        <span className="detail-value">{formatDateShort(pred.ovulationDate)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">💫 Cửa sổ thụ thai:</span>
                        <span className="detail-value">
                          {formatDateShort(pred.fertileStart)} - {formatDateShort(pred.fertileEnd)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="disclaimer">
          <p>
            ⚠️ <strong>Lưu ý:</strong> Đây chỉ là công cụ dự đoán dựa trên chu kỳ trung bình. 
            Chu kỳ kinh nguyệt có thể thay đổi do nhiều yếu tố. 
            Vui lòng tham khảo ý kiến bác sĩ để có thông tin chính xác hơn.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PeriodTracker

