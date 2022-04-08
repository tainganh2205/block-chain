import React from 'react'

export interface TokenLogoProps {
  image?: string
  imagePair?: string
}

export const TokenLogo = (props: TokenLogoProps) => {
  const { image, imagePair } = props
  return (
    <div className="flex relative flex-row-reverse">
      <img
        className="flex-none bg-white rounded-full h-6 w-6 p-0.5 border order-2"
        src={image}
        alt="logo"
      />
      {imagePair ? (
        <img
          className="flex-none relative -left-2 bg-white rounded-full h-6 w-6 p-0.5 border order-1"
          src={imagePair}
          alt="logo"
        />
      ) : null}
    </div>
  )
}
