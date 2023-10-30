import { ShapeProps, ConcreteRectangle, ConcreteEllipse, ConcreteLine, Shapes } from '..'

// Concrete interface for Outlined Shapes
interface OutlinedShapeFactory {
  createRectangle(props: ShapeProps): Shapes
  createEllipse(props: ShapeProps): Shapes
  createLine(props: ShapeProps): Shapes
}

// Concrete interface for Filled Shapes
interface FilledShapeFactory {
  createRectangle(props: ShapeProps): Shapes
  createEllipse(props: ShapeProps): Shapes
  createLine(props: ShapeProps): Shapes
}

// Concrete factory for Outlined Shapes
export class OutlinedShapeConcreteFactory implements OutlinedShapeFactory {
  createRectangle({ position, size, zIndex, selected, color }: ShapeProps): Shapes {
    return new ConcreteRectangle(position, size, zIndex, selected, color)
  }

  createEllipse({ position, size, zIndex, selected, color }: ShapeProps): Shapes {
    return new ConcreteEllipse(position, size, zIndex, selected, color)
  }

  createLine({ position, size, zIndex, selected, color }: ShapeProps): Shapes {
    return new ConcreteLine(position, size, zIndex, selected, color)
  }
}

// Concrete factory for Filled Shapes
export class FilledShapeConcreteFactory implements FilledShapeFactory {
  createRectangle({ position, size, zIndex, selected, color }: ShapeProps): Shapes {
    return new ConcreteRectangle(position, size, zIndex, selected, color)
  }

  createEllipse({ position, size, zIndex,selected,  color }: ShapeProps): Shapes {
    return new ConcreteEllipse(position, size, zIndex, selected, color)
  }

  createLine({ position, size, zIndex, selected, color }: ShapeProps): Shapes {
    return new ConcreteLine(position, size, zIndex, selected, color)
  }
}
