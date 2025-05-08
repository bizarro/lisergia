export interface DOMRectBounds {
  bottom: number
  height: number
  left: number
  top: number
  width: number
}

function getBounds(element: HTMLElement, top = 0) {
  const box = element.getBoundingClientRect()

  return {
    bottom: box.bottom,
    height: box.height,
    left: box.left,
    top: box.top + top,
    width: box.width,
  } as DOMRectBounds
}

export const DOMUtils = {
  getBounds,
}
