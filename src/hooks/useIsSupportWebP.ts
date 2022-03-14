import { useEffect, useState } from 'react'

function supportWebPFormat() {
  const elem = document.createElement('canvas')

  if (elem.getContext && elem.getContext('2d')) {
    // was able or not to get WebP representation
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }

  return false
}

export function useIsSupportWebP() {
  // Assume we mostly use the hook to handle media asset usage and most modern browsers suppport *.webp,
  // set default to true to avoid the request to the fallback image
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    // Put the check inside useEffect to support SSR
    setIsSupported(supportWebPFormat())
  }, [])

  return isSupported
}
