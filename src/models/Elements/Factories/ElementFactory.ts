import AbstractFactory from '.'
import Ellipse from '../Shapes/ellipse'
import Line from '../Shapes/line'
import Rectangle from '../Shapes/rectangle'
import Text from '../Text'
import Image from '../Image'

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

  createText(id: number): Text {
    return new Text(id)
  }

  createImage(id: number): Image {
    return new Image(id)
  }
}

export default ElementFactory
