import Elements, { Shapes } from '../Elements'
import Image from '../Elements/Image'
import Ellipse from '../Elements/Shapes/ellipse'
import Line from '../Elements/Shapes/line'
import Rectangle from '../Elements/Shapes/rectangle'
import Text from '../Elements/Text'
import { Position, Size } from '../base'

type ChangeListener = () => void

class CreatedComposite {
  private created: Elements[] = []
  private selected: Elements[] = []

  // listeners
  private shapeChangeListener: ChangeListener | null = null
  private layerChangeListener: ChangeListener | null = null
  private propertyWindowListener: ChangeListener | null = null

  create(element: Elements) {
    this.created.push(element)
    this.notifyShapeChanges()
  }

  destroy(id: number) {
    this.created.forEach(element => {
      if (element.id === id) {
        element.deleted = true
      }
    })
    this.selected = this.selected.filter(el => el.id !== id)
    this.notifyShapeChanges()
    this.notifyLayerChanges()
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
    this.notifyShapeChanges()
    this.notifyPropertyWindowChanges()
  }

  deselect(element: Elements) {
    this.selected = this.selected.filter(el => el.id !== element.id)
    element.selected = false
    this.notifyShapeChanges()
    this.notifyPropertyWindowChanges()
  }

  deselectAll() {
    this.selected.forEach(element => {
      element.setSelect(false)
    })
    this.selected = []

    this.notifyShapeChanges()
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

    this.notifyShapeChanges()
    this.notifyPropertyWindowChanges()
  }

  updateSize(id: number, size: Size) {
    this.selected.forEach(element => {
      if (element.id === id) {
        element.size = size
      }
    })

    this.notifyShapeChanges()
    this.notifyPropertyWindowChanges()
  }

  updateColor(id: number, color: string) {
    this.created.forEach(element => {
      if (element.id === id && (element instanceof Shapes || element instanceof Text)) {
        element.color = color
      }
    })
    this.notifyPropertyWindowChanges()
    this.notifyShapeChanges()
  }

  updateFontSize(id: number, fontSize: number) {
    this.created.forEach(element => {
      if (element.id === id && element instanceof Text) {
        element.fontSize = fontSize
      }
      console.log('element', element)
    })
    this.notifyPropertyWindowChanges()
    this.notifyBasedOnType(this.created.find(el => el.id === id) as Elements)
  }

  updateZIndex(id: number, zIndex: number) {
    this.created.forEach(element => {
      if (element.id === id) {
        element.zIndex = zIndex
      }
    })
    this.notifyLayerChanges()
    this.notifyShapeChanges()
  }

  getRectangles(): Array<Rectangle> {
    return this.created.filter(el => el instanceof Rectangle) as Array<Rectangle>
  }

  getLines(): Array<Line> {
    return this.created.filter(el => el instanceof Line) as Array<Line>
  }

  getEllipse(): Array<Ellipse> {
    return this.created.filter(el => el instanceof Ellipse) as Array<Ellipse>
  }

  listenForShapeChanges(listener: ChangeListener) {
    if (this.shapeChangeListener) {
      this.shapeChangeListener = null
    }

    this.shapeChangeListener = listener
  }

  listenForTextChanges(listener: ChangeListener) {
    if (this.textChangeListener) {
      this.textChangeListener = null
    }

    this.textChangeListener = listener
  }

  listenForImageChanges(listener: ChangeListener) {
    if (this.imageChangeListener) {
      this.imageChangeListener = null
    }

    this.imageChangeListener = listener
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

  private notifyShapeChanges() {
    this.notifyLayerChanges()

    if (this.shapeChangeListener) {
      this.shapeChangeListener()
    }
  }
}

export default CreatedComposite
