import React, { useState } from 'react'

const GameInfo = ({ img, label, title }) => {
  const [readMore, setReadMore] = useState(false)

  return (
    <div className="h__GameInfo w-33 text-center">
      <img src={img} alt="..." />
      <h3 className="tw">{label}</h3>
      <span>{readMore ? title : `${title.substring(0, 90)}...`}</span>
      <p>
        <button type="button" onClick={() => setReadMore(!readMore)}>
          {readMore ? 'Show less' : ' More details'}
        </button>
      </p>
    </div>
  )
}

export default GameInfo
