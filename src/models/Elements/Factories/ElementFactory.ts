import AbstractFactory from '.'
import Ellipse from '../Shapes/ellipse'
import Line from '../Shapes/line'
import Rectangle from '../Shapes/rectangle'

class ElementFactory extends AbstractFactory {
  createLine(id: number): Line {
    return new Line(id)
  }

  createEllipse(id: number): Ellipse {
    return new Ellipse(id)
  }

  createRectangle(id: number): Rectangle {
    return new Rectangle(id)
  }
}

export default ElementFactory



// Usage
// const shapeFactory = new ShapeFactory();

// const line = shapeFactory.createLine();
// line.setProperties({
//   size: { width: 50, height: 5 },
//   position: { x: 10, y: 10 },
//   zIndex: 1,
// });
// line.draw();

// const ellipse = shapeFactory.createEllipse();
// ellipse.setProperties({
//   size: { width: 30, height: 20 },
//   position: { x: 50, y: 50 },
//   zIndex: 2,
// });
// ellipse.draw();

// const rectangle = shapeFactory.createRectangle();
// rectangle.setProperties({
//   size: { width: 40, height: 30 },
//   position: { x: 100, y: 100 },
//   zIndex: 3,
// });
// rectangle.draw();