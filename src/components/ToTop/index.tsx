import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ top: any }>`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 2px solid #16b979;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  visibility: ${({ top }) => (Number(top) > 200 ? 'visible' : 'hidden')};
  opacity: ${({ top }) => (Number(top) > 200 ? '1' : '0')};
  transition: all 0.7s linear;
  -moz-transition: all 0.7s linear;
  -webkit-transition: all 0.7s linear;
  -o-transition: all 0.7s linear;
  -ms-transition: all 0.7s linear;
  .art-to-top {
    position: relative;
    width: 100%;
    height: 100%;
    .cls-1 {
        fill: none;
    }
    .cls-2 {
        fill: #239667;
    }
  }
`

const ToTop = memo(() => {

  const onTop = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  const [top, settop]: any = useState(0)
  useEffect(() => {
    window.onscroll = () => {
      settop(Number(window.pageYOffset))
    }
  }, [])
  return (
    <>
      <Wrapper id="art-btn-to-top" top={top} onClick={onTop}>
        <span>
          <div className="art-to-top">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
              <g id="angle-chevron-up" transform="translate(327 -356) rotate(90)">
                <rect
                  id="Rectangle_1"
                  data-name="Rectangle 1"
                  className="cls-1"
                  width="21"
                  height="21"
                  transform="translate(356 306)"
                />
                <path
                  id="angle-chevron-left_copy"
                  data-name="angle-chevron-left copy"
                  className="cls-2"
                  d="M2.646,6.054,6.792,1.907a1.136,1.136,0,0,0,0-1.534,1.136,1.136,0,0,0-1.534,0L.373,5.316h0a1.136,1.136,0,0,0,0,1.534l4.885,4.885a1.1,1.1,0,0,0,.742.34.916.916,0,0,0,.738-.341,1.136,1.136,0,0,0,0-1.534Z"
                  transform="translate(362.924 310.924)"
                />
              </g>
            </svg>
          </div>
        </span>
      </Wrapper>
    </>
  )
})

export default ToTop
