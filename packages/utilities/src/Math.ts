function lerp(start: number, end: number, time: number) {
  return start + (end - start) * time
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function map(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clamp: boolean = false,
): number {
  let mapped = ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin

  if (clamp) {
    const [minOut, maxOut] = outMin < outMax ? [outMin, outMax] : [outMax, outMin]
    mapped = Math.min(Math.max(mapped, minOut), maxOut)
  }

  return mapped
}

export const MathUtils = {
  clamp,
  lerp,
  map,
  random,
}
