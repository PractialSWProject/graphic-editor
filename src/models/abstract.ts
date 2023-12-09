// base.ts
export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

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
