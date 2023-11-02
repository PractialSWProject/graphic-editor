import Elements, { ElementProps } from '..'

class Rectangle extends Elements {
  create() {
    console.log('Drawing a Rectangle:', this.properties)
  }

  setProps(properties: ElementProps) {
    this.properties = properties
  }
  setSelect(selected: boolean): void {
    this.selected = selected
  }
}

export default Rectangle
