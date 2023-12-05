import Elements, { Shapes } from '../Elements'
import Text from '../Elements/Text'
import { Position, Size } from '../base'

type ChangeListener = () => void

class CreatedComposite {
  private created: Elements[] = []
  private selected: Elements[] = []

  // listeners
  private elementChangeListener: ChangeListener | null = null
  private layerChangeListener: ChangeListener | null = null
  private propertyWindowListener: ChangeListener | null = null

  create(element: Elements) {
    this.created.push(element)
    this.notifyElementChanges()
  }

  clear() {
    this.created = []
  }

  get(): Elements[] {
    return this.created
  }

  select(element: Elements) {
    this.selected.push(element)
    element.selected = true
    this.notifyElementChanges()
    this.notifyPropertyWindowChanges()
  }

  deselect(element: Elements) {
    this.selected = this.selected.filter(el => el.id !== element.id)
    element.selected = false
    this.notifyElementChanges()
    this.notifyPropertyWindowChanges()
  }

  deselectAll() {
    this.selected.forEach(element => {
      element.setSelect(false)
    })
    this.selected = []

    this.notifyElementChanges()
    this.notifyPropertyWindowChanges()
  }

  isInSelectionManager(element: Elements): boolean {
    return this.selected.some(selectedElement => {
      return element.id === selectedElement.id
    })
  }

  getSelected(): Elements[] {
    return this.selected
  }

  updatePosition(id: number, position: Position) {
    this.selected.forEach(element => {
      if (element.id === id) {
        element.position = position
      }
    })

    this.notifyElementChanges()
    this.notifyPropertyWindowChanges()
  }

  updateSize(id: number, size: Size) {
    this.selected.forEach(element => {
      if (element.id === id) {
        element.size = size
      }
    })

    this.notifyElementChanges()
    this.notifyPropertyWindowChanges()
  }

  updateColor(id: number, color: string) {
    this.created.forEach(element => {
      if (element.id === id && (element instanceof Shapes || element instanceof Text)) {
        element.color = color
      }
    })
    this.notifyPropertyWindowChanges()
    this.notifyElementChanges()
  }

  updateFontSize(id: number, fontSize: number) {
    this.created.forEach(element => {
      if (element.id === id && element instanceof Text) {
        element.fontSize = fontSize
      }
      console.log('element', element)
    })
    this.notifyPropertyWindowChanges()
    this.notifyElementChanges()
  }

  updateZIndex(id: number, zIndex: number) {
    this.created.forEach(element => {
      if (element.id === id) {
        element.zIndex = zIndex
      }
    })
    this.notifyLayerChanges()
    this.notifyElementChanges()
  }

  listenForElementChanges(listener: ChangeListener) {
    if (this.elementChangeListener) {
      this.elementChangeListener = null
    }

    this.elementChangeListener = listener
  }

  listenForLayerChanges(listener: ChangeListener) {
    if (this.layerChangeListener) {
      this.layerChangeListener = null
    }
    this.layerChangeListener = listener
  }

  listenForPropertyWindow(listener: ChangeListener) {
    if (this.propertyWindowListener) {
      this.propertyWindowListener = null
    }
    this.propertyWindowListener = listener
  }

  private notifyPropertyWindowChanges() {
    if (this.propertyWindowListener) {
      this.propertyWindowListener()
    }
  }

  private notifyLayerChanges() {
    if (this.layerChangeListener) {
      this.layerChangeListener()
    }
  }

  private notifyElementChanges() {
    this.notifyLayerChanges()

    if (this.elementChangeListener) {
      this.elementChangeListener()
    }
  }
}

export default CreatedComposite
