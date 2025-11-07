import React, { useState, useEffect } from 'react'
import '../../../styles/Utility.css'
import './Calendar.css'

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [lunarDate, setLunarDate] = useState(null)

  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  const weekDaysFull = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
  const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
                  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

  // Lấy ngày đầu tiên của tháng
  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    return firstDay.getDay()
  }

  // Lấy số ngày trong tháng
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  // Chuyển đổi dương lịch sang âm lịch (sử dụng API hoặc tính toán)
  const convertToLunar = async (solarDate) => {
    try {
      // Sử dụng API miễn phí để chuyển đổi
      const year = solarDate.getFullYear()
      const month = solarDate.getMonth() + 1
      const day = solarDate.getDate()
      
      // API miễn phí từ amlich.net hoặc tự tính toán
      // Tạm thời sử dụng một hàm tính toán đơn giản
      const lunar = calculateLunarDate(year, month, day)
      setLunarDate(lunar)
    } catch (error) {
      console.error('Error converting to lunar:', error)
      setLunarDate(null)
    }
  }

  // Hàm tính toán âm lịch đơn giản (không chính xác 100%)
  const calculateLunarDate = (year, month, day) => {
    // Đây là một hàm tính toán đơn giản, không chính xác hoàn toàn
    // Để có kết quả chính xác, cần sử dụng thuật toán phức tạp hơn hoặc API
    const lunarMonths = [
      'Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu',
      'Bảy', 'Tám', 'Chín', 'Mười', 'Một', 'Chạp'
    ]
    
    // Tính toán đơn giản (chỉ để demo)
    // Trong thực tế cần thuật toán phức tạp hơn
    const offset = Math.floor((year - 1900) * 365.25) + 
                   Math.floor((month - 1) * 30.44) + day - 1
    const lunarDay = (offset % 30) + 1
    const lunarMonth = Math.floor((offset / 30) % 12) + 1
    
    return {
      day: lunarDay,
      month: lunarMonth,
      monthName: lunarMonths[lunarMonth - 1],
      year: year,
      isLeapMonth: false
    }
  }

  useEffect(() => {
    convertToLunar(selectedDate)
  }, [selectedDate])

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDate(today)
  }

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(newDate)
    // Tự động chuyển tháng nếu cần (nếu click vào ngày của tháng khác)
    // Nhưng trong trường hợp này, chỉ hiển thị tháng hiện tại nên không cần
  }

  const renderCalendar = () => {
    const firstDay = getFirstDayOfMonth(currentDate)
    const daysInMonth = getDaysInMonth(currentDate)
    const days = []
    const today = new Date()

    // Thêm các ngày trống ở đầu tháng
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // Thêm các ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const isToday = date.toDateString() === today.toDateString()
      const isSelected = date.toDateString() === selectedDate.toDateString()
      const isWeekend = date.getDay() === 0 || date.getDay() === 6

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${isWeekend ? 'weekend' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
        </div>
      )
    }

    return days
  }

  const getSelectedDateInfo = () => {
    const dayOfWeek = weekDaysFull[selectedDate.getDay()]
    const day = selectedDate.getDate()
    const month = selectedDate.getMonth() + 1
    const monthName = months[selectedDate.getMonth()]
    const year = selectedDate.getFullYear()
    const solarDate = `${day}/${month}/${year}`
    const solarDateFull = `${day} ${monthName.toLowerCase()} ${year}`
    
    return {
      dayOfWeek,
      day,
      month,
      monthName,
      year,
      solarDate,
      solarDateFull,
      lunarDate: lunarDate ? `${lunarDate.day} tháng ${lunarDate.monthName} năm ${lunarDate.year}` : 'Đang tính...'
    }
  }

  const dateInfo = getSelectedDateInfo()

  return (
    <div className="utility-container">
      <div className="calendar-wrapper">
        {/* Thông tin ngày đã chọn - Hiển thị rõ ràng */}
        <div className="calendar-selected-info">
          <div className="selected-date-main">
            <div className="selected-day">{dateInfo.day}</div>
            <div className="selected-month-year">
              <div className="selected-month">{dateInfo.monthName}</div>
              <div className="selected-year">{dateInfo.year}</div>
            </div>
          </div>
          <div className="selected-date-details">
            <div className="detail-item">
              <span className="detail-label">Thứ:</span>
              <span className="detail-value">{dateInfo.dayOfWeek}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Dương lịch:</span>
              <span className="detail-value">{dateInfo.solarDateFull}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Âm lịch:</span>
              <span className="detail-value">{dateInfo.lunarDate}</span>
            </div>
          </div>
        </div>

        {/* Điều khiển lịch */}
        <div className="calendar-controls">
          <button onClick={handlePrevMonth} className="calendar-nav-btn" title="Tháng trước">
            ←
          </button>
          <div className="calendar-month-year">
            <h3>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
          </div>
          <button onClick={handleNextMonth} className="calendar-nav-btn" title="Tháng sau">
            →
          </button>
        </div>

        <button onClick={handleToday} className="calendar-today-btn">
          📍 Hôm nay
        </button>

        {/* Lịch */}
        <div className="calendar-grid">
          <div className="calendar-weekdays">
            {weekDays.map((day, index) => (
              <div key={index} className="calendar-weekday">
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-days">
            {renderCalendar()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar

