import React from "react";

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  src: string
  fallback: string
  alt?: string
  width?: number | string
  height?: number | string
  type?: 'image/webp' | 'image/jpeg'
}

// eslint-disable-next-line import/prefer-default-export
export const ImgWithFallback = ({
  src,
  fallback,
  type = 'image/webp',
  alt = '',
  ...props
}: Props) => {
  return (
    <picture>
      <source srcSet={src} type={type} />
      <img src={fallback} alt={alt} {...props} />
    </picture>
  )
}
