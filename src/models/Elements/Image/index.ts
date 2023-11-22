import Elements from '..'

class Image extends Elements {
  public url: string = ''

  setSelect(selected: boolean): void {
    this.selected = selected
  }
}

export default Image
