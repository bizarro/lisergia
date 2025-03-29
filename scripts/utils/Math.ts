import GSAP from 'gsap'

function lerp(p1: number, p2: number, t: number) {
  return GSAP.utils.interpolate(p1, p2, t)
}

function clamp(min: number, max: number, number: number) {
  return GSAP.utils.clamp(min, max, number)
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function map(
  valueToMap: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  isClamped: boolean = false,
) {
  let range = GSAP.utils.mapRange(inMin, inMax, outMin, outMax, valueToMap)

  if (isClamped) {
    range = GSAP.utils.clamp(outMin, outMax, range)
  }

  return range
}

function round(value: number, precision = 3) {
  return parseFloat(value.toFixed(precision))
}

export const MathUtils = {
  clamp,
  lerp,
  map,
  random,
  round,
}
