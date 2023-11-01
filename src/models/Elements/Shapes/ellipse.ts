import Elements, { ElementProps } from '..'

class Ellipse extends Elements {
  create() {
    console.log('Drawing an Ellipse:', this.properties)
  }

  setProps(properties: ElementProps) {
    this.properties = properties
  }

  setSelect(selected: boolean): void {
    this.selected = selected
  }
}

export default Ellipse
