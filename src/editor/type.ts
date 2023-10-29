import { Typography } from '../models/text'
import { Shapes } from '../models/shapes'
import { Image } from '../models/image'

export interface ShapeElementT {
  id: number
  variant: VariantT
  shape: Shapes
}

export interface TextElementT {
  id: number
  text: Typography
}

export interface ImageElementT {
  id: number
  img: Image
}

export type VariantT = 'filled' | 'outlined'
