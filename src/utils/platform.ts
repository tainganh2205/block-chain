// https://stackoverflow.com/a/22953053
export function isWebGLSupport() {
  try {
    const canvas = document.createElement('canvas')
    return (
      !!window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}
