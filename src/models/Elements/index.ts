import getRandomColor from '../../utils/randomColor'
import { DEFAULT_POS, DEFAULT_SIZE, Position, Size, ZIndex } from '../base'

abstract class Elements {
  public id: number
  public selected: boolean = false
  public size: Size = DEFAULT_SIZE
  public position: Position = DEFAULT_POS
  public zIndex: ZIndex = 0

  constructor(id: number) {
    this.id = id
    this.zIndex = id
  }

  abstract setSelect(selected: boolean): void
}

export abstract class Shapes extends Elements {
  public color: string = DEFAULT_COLOR
}

export default Elements
