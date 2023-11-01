import Elements, { ElementProps } from '..'

class Line extends Elements {
  create() {
    console.log('Drawing a line:', this.properties)
  }

  setProps(properties: ElementProps) {
    this.properties = properties
  }
  setSelect(selected: boolean): void {
    this.selected = selected
  }
}

export default Line
