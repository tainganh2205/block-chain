/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './index.less'


const Maintenance =  React.memo((props: any): any => {

  const img ={
    imgMaintenance: '/assets/images/maintenance.png'
  }

  return (
    <>
      <div className="maintenance">
        
        <div className='contentMaintenance'>
        <img src={img.imgMaintenance} />
          <p className='textMaintenance'>ArtInfinity Prediction Market is under maintanance.</p><br/>
          <button className="btnMaintenance">
            <a href="#!">Go back home</a>
          </button>
        </div>
      </div>
    </>
  )
})

function areEqual(prevProps, nextProps) {
  if (prevProps.isMaintenance === nextProps.isMaintenance) {
    return true
  }
  return false
}
export default React.memo(Maintenance, areEqual)
