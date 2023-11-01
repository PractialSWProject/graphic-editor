export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export type ZIndex = number
export type Color = string

export const DEFAULT_POS = { x: 100, y: 100 }
export const DEFAULT_SIZE = { width: 100, height: 100 }
export const DEFAULT_COLOR = '#4a4a4a'
export const DEFAULT_CONTENT = 'This is text'
export const DEFAULT_FONTSIZE = 15
