import React, { useState } from 'react'
import '../../../styles/Utility.css'

function TextSplitMerge() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  return (
    <div className="utility-container">
      <div className="info-text">
        Tính năng đang được phát triển. Vui lòng quay lại sau!
      </div>
    </div>
  )
}

export default TextSplitMerge

