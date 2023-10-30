import { ElementProps, Elements, ConcreteElements, Position, Size, ZIndex, Color } from '..'

export interface ShapeProps extends ElementProps {
  color: Color
}

// Abstract Shape interface
export interface Shapes extends Elements {
  getColor(): string
  setColor(color: string): void
}

class ConcreteShape extends ConcreteElements implements Shapes {
  constructor(
    position: Position,
    size: Size,
    zIndex: ZIndex,
    selected: boolean,
    private color: Color
  ) {
    super(position, size, zIndex, selected)
  }

  getColor(): Color {
    return this.color
  }

  setColor(color: Color): void {
    this.color = color
  }
}

export class ConcreteRectangle extends ConcreteShape {}

export class ConcreteEllipse extends ConcreteShape {}

export class ConcreteLine extends ConcreteShape {}
