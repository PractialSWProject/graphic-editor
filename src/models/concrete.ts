// concrete.ts
import getNewPosition from '../utils/newPosition'
import getRandomColor from '../utils/randomColor'
import { DEFAULT_COLOR, DEFAULT_FONTSIZE, DEFAULT_POS, DEFAULT_SIZE } from './base'
import { AbstractElement, AbstractImage, AbstractShape, AbstractText, Position, ShapeType, Size } from './abstract'

export abstract class ConcreteElement implements AbstractElement {
  protected id: number
  protected isSelected: boolean
  protected position: Position
  protected size: Size
  protected zIndex: number

  constructor(id: number, position: Position, size: Size, zIndex: number, isSelected: boolean = false) {
    this.id = id
    this.isSelected = isSelected
    this.position = position
    this.size = size
    this.zIndex = zIndex
  }

  // Getters
  getId(): number {
    return this.id
  }

  getIsSelected(): boolean {
    return this.isSelected
  }

  getPosition(): Position {
    return this.position
  }

  getSize(): Size {
    return this.size
  }

  getZIndex(): number {
    return this.zIndex
  }

  // Setters
  setIsSelected(isSelected: boolean): void {
    this.isSelected = isSelected
  }

  setPosition(position: Position): void {
    this.position = position
  }
  setSize(size: Size): void {
    this.size = size
  }

  setZIndex(zIndex: number): void {
    this.zIndex = zIndex
  }
}

export class ConcreteImage extends ConcreteElement implements AbstractImage {
  private url: string

  constructor(id: number, url: string, size: Size, position: Position, zIndex: number, isSelected: boolean = false) {
    super(id, position, size, zIndex, isSelected)
    this.url = url
  }
  getUrl(): string {
    return this.url
  }

  setUrl(url: string): void {
    this.url = url
  }
}

export class ConcreteShape extends ConcreteElement implements AbstractShape {
  private color: string
  private shapeType: string

  constructor(
    id: number,
    shapeType: ShapeType,
    position: Position,
    size: Size,
    zIndex: number,
    color: string,
    isSelected: boolean = false
  ) {
    super(id, position, size, zIndex, isSelected)
    this.color = color
    this.shapeType = shapeType
  }

  getColor(): string {
    return this.color
  }

  getType(): string {
    return this.shapeType
  }

  setColor(color: string): void {
    this.color = color
  }
}

export class ConcreteText extends ConcreteElement implements AbstractText {
  private fontSize: number
  private content: string
  private color: string

  constructor(
    id: number,
    content: string,
    position: Position,
    size: Size,
    zIndex: number,
    color: string,
    fontSize: number,
    isSelected: boolean = false
  ) {
    super(id, position, size, zIndex, isSelected)
    this.fontSize = fontSize
    this.content = content
    this.color = color
  }

  getFontSize(): number {
    return this.fontSize
  }

  getContent(): string {
    return this.content
  }

  getColor(): string {
    return this.color
  }

  // Setters

  setFontSize(fontSize: number): void {
    this.fontSize = fontSize
  }

  setContent(content: string): void {
    this.content = content
  }

  setColor(color: string): void {
    this.color = color
  }
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
