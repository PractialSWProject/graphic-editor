import { Typography } from '../models/text'
import { Shapes } from '../models/shapes'

export interface ShapeElementT {
  id: number
  variant: VariantT
  shape: Shapes
}

export interface TextElementT {
  id: number
  text: Typography
}
export type VariantT = 'filled' | 'outlined'
