// just interfaces for the concrete elements
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

export const ELLIPSE = 'ELLIPSE'
export const RECTANGLE = 'RECTANGLE'
export const LINE = 'LINE'
export type ShapeType = typeof ELLIPSE | typeof RECTANGLE | typeof LINE

export interface AbstractElement {
  getId(): number
  getIsSelected(): boolean
  getPosition(): Position
  getSize(): Size
  getZIndex(): number

  setIsSelected(isSelected: boolean): void
  setPosition(position: Position): void
  setSize(size: Size): void
  setZIndex(zIndex: number): void
}

export interface AbstractImage extends AbstractElement {
  getUrl(): string
}

export interface AbstractShape extends AbstractElement {
  getColor(): string
  getType(): string
  setColor(color: string): void
}

export interface AbstractText extends AbstractElement {
  getColor(): string
  getFontSize(): number
  getContent(): string
}
// Abstract Factory
export interface AbstractFactory {
  createImage(
    id: number,
    url: string,
    size: Size,
    position: Position,
    zIndex: number,
    isSelected?: boolean
  ): AbstractImage

  createShape(id: number, shapeType: string): AbstractShape

  createText(
    id: number,
    content: string,
    position: Position,
    size: Size,
    zIndex: number,
    color: string,
    fontSize: number,
    isSelected?: boolean
  ): AbstractText
}
