import Elements from '..'
import { DEFAULT_COLOR, DEFAULT_CONTENT, DEFAULT_FONTSIZE } from '../../base'

class Text extends Elements {
  public color: string = DEFAULT_COLOR
  public content: string = DEFAULT_CONTENT
  public fontSize: number = DEFAULT_FONTSIZE

  setSelect(selected: boolean): void {
    this.selected = selected
  }
}

export default Text
