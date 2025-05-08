function trim(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')!

  const copy = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height)
  const length = pixels.data.length

  const bound: {
    bottom: number | null
    left: number | null
    right: number | null
    top: number | null
  } = {
    bottom: null,
    left: null,
    right: null,
    top: null,
  }

  let x: number
  let y: number

  for (let i = 0; i < length; i += 4) {
    if (pixels.data[i + 3] !== 0) {
      x = (i / 4) % canvas.width
      y = ~~(i / 4 / canvas.width)

      if (bound.top === null) {
        bound.top = y
      }

      if (bound.left === null) {
        bound.left = x
      } else if (x < bound.left) {
        bound.left = x
      }

      if (bound.right === null) {
        bound.right = x
      } else if (bound.right < x) {
        bound.right = x
      }

      if (bound.bottom === null) {
        bound.bottom = y
      } else if (bound.bottom < y) {
        bound.bottom = y
      }
    }
  }

  const trimHeight = bound.bottom! - bound.top!
  const trimWidth = bound.right! - bound.left!
  const trimmed = context.getImageData(bound.left!, bound.top!, trimWidth, trimHeight)

  copy!.canvas.width = trimWidth
  copy!.canvas.height = trimHeight
  copy!.putImageData(trimmed, 0, 0)

  return copy!.canvas
}

export const CanvasUtils = {
  trim,
}
