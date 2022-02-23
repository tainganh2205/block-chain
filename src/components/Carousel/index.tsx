/* eslint-disable no-empty-pattern, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import './index.less'

const styleEle = { display: 'none' }
const show = { display: 'block' }

const CarouselBSC = memo(({ children, ...props }: any) => {
  const [indexActive, setIndexActive] = useState<number>(0)
  const refFirst = useRef<any>(null)

  const onChangeIndex = useCallback((idx) => {
    setIndexActive(idx)
  }, [])

  const dots = (
    <div
      className={`bsc-carousel-dots ${props.leftDots ? 'bsc-carousel-dots-left' : ''}`}
    >
      {React.Children.map(children, ( {}, idx) => (<div onClick={() => onChangeIndex(idx)} className={`bsc-carousel-dot ${indexActive === idx ? 'bsc-carousel-dot-actived' : ''}`} />))}
    </div>
  )

  return (
    <div
      className={`bsc-carousel ${props.leftDots ? 'bsc-carousel-mobile' : ''} ${props.className ? props.className : ''}`}
    >
      <div
        className='bsc-carousel-content hiden-scrollbar'
      >
        {React.Children.map(children, (child, idx) => {
          if (idx === 0) {
            return React.cloneElement(child as any, { ref: refFirst, style: { ...styleEle, ...(indexActive === idx ? show : {}) } })
          }
          return React.cloneElement(child as any, { style: { ...styleEle, ...(indexActive === idx ? show : {}) } })
        })}
      </div>
      {dots}
    </div>
  )
})

export default CarouselBSC