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

export interface ElementProps {
  position: Position
  size: Size
  zIndex: ZIndex
  selected: boolean
}

// Abstract Elements interface
export interface Elements {
  getPosition(): Position
  setPosition(props: Position): void

  getZIndex(): number
  setZIndex(zIndex: number): void

  getSize(): Size
  setSize(props: Size): void

  getSelected(): boolean
  setSelected(selected: boolean): void
}


export class ConcreteElements implements Elements {
  constructor(private position: Position, private size: Size, private zIndex: ZIndex, private selected = false) {}

  getPosition(): Position {
    return { x: this.position.x, y: this.position.y }
  }

  setPosition(props: Position): void {
    this.position.x = props.x
    this.position.y = props.y
  }

  getZIndex(): ZIndex {
    return this.zIndex
  }

  setZIndex(zIndex: ZIndex): void {
    this.zIndex = zIndex
  }

  getSize(): Size {
    return { width: this.size.width, height: this.size.height }
  }

  setSize(props: Size): void {
    this.size.width = props.width
    this.size.height = props.height
  }

  getSelected(): boolean {
    return this.selected;
  }

  setSelected(selected: boolean): void {
    this.selected = selected;
  } 
}

