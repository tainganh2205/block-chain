/* eslint-disable react/no-unescaped-entities */
import React from 'react'

export default function Message() {
    return (
        <>
            <div className="box-message">
                <div className="info-message">You don't own any digital artwork</div>
                <img src="/images/message.png" alt="unknown-artwork" className="img-message" />
                    <a className="btn-message a-bsc" href="#/NFTmarket">
                        Go to home
                    </a>
                </div>
        </>
  )
}
