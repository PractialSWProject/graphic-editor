import Ellipse from '../Shapes/ellipse'
import Line from '../Shapes/line'
import Rectangle from '../Shapes/rectangle'
import Text from '../Text'
import Image from '../Image'

abstract class AbstractFactory {
  abstract createLine(id: number): Line
  abstract createEllipse(id: number): Ellipse
  abstract createRectangle(id: number): Rectangle
  abstract createText(id: number): Text
  abstract createImage(id: number): Image
}

export default AbstractFactory
