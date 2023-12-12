import getNewPosition from '../utils/newPosition'
import getRandomColor from '../utils/randomColor'
import {
  AbstractImage,
  AbstractShape,
  AbstractText,
  Position,
  ShapeType,
  Size,
  DEFAULT_POS,
  DEFAULT_SIZE,
  DEFAULT_COLOR,
  DEFAULT_FONTSIZE
} from './elementAbstract'
import { ConcreteImage, ConcreteShape, ConcreteText } from './elementConcrete'

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

export class ConcreteFactory implements AbstractFactory {
  createImage(
    id: number,
    url: string,
    size: Size,
    position: Position = DEFAULT_POS,
    zIndex: number = id,
    isSelected: boolean = false
  ): ConcreteImage {
    return new ConcreteImage(id, url, size, position, zIndex, isSelected)
  }

  createShape(
    id: number,
    shapeType: ShapeType,
    position: Position = getNewPosition(),
    size: Size = DEFAULT_SIZE,
    zIndex: number = id,
    color: string = getRandomColor(),
    isSelected: boolean = false
  ): ConcreteShape {
    return new ConcreteShape(id, shapeType, position, size, zIndex, color, isSelected)
  }

  createText(
    id: number,
    content: string,
    position: Position = DEFAULT_POS,
    size: Size = DEFAULT_SIZE,
    zIndex: number = id,
    color: string = DEFAULT_COLOR,
    fontSize: number = DEFAULT_FONTSIZE,
    isSelected: boolean = false
  ): ConcreteText {
    return new ConcreteText(id, content, position, size, zIndex, color, fontSize, isSelected)
  }
}
