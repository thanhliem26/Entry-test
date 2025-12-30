import { Unit } from '../types/common'

//string cleaning
export function sanitize(value: string) {
  if (!value) return null

  // change from "," to "."
  value = value.replaceAll(',', '.')

  // take the first valid number
  const match = value.match(/^-?\d+(\.\d+)?/)
  if (!match) return null

  return parseFloat(match[0])
}

export function clamp(value: number, unit: Unit, prevValue: number) {
  if (value < 0) return 0
  if (value > 100 && unit === Unit.PERCENT) return prevValue > 100 ? 100 : prevValue

  return value
}
