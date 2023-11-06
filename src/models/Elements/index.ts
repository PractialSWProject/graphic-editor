import getRandomColor from '../../utils/randomColor'
import { DEFAULT_POS, DEFAULT_SIZE, Position, Size, ZIndex } from '../base'

export interface ElementProps {
  size: Size
  position: Position
  zIndex: ZIndex
  color: string
}

abstract class Elements {
  public id: number
  public selected: boolean = false
  public deleted: boolean = false
  public properties: ElementProps = {
    size: DEFAULT_SIZE,
    position: DEFAULT_POS,
    zIndex: 0,
    color: getRandomColor()
  }

  constructor(id: number) {
    this.id = id
    this.properties.zIndex = id
  }

  abstract create(): void
  abstract setProps(props: ElementProps): void
  abstract setSelect(selected: boolean): void
}

export default Elements
