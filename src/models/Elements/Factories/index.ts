import Ellipse from '../Shapes/ellipse'
import Line from '../Shapes/line'
import Rectangle from '../Shapes/rectangle'

abstract class AbstractFactory {
  abstract createLine(id: number): Line
  abstract createEllipse(id: number): Ellipse
  abstract createRectangle(id: number): Rectangle
}

export default AbstractFactory
