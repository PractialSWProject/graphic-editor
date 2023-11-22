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
  private rectChangeListener: ChangeListener | null = null
  private lineChangeListener: ChangeListener | null = null
  private ellipseChangeListener: ChangeListener | null = null
  private textChangeListener: ChangeListener | null = null
  private imageChangeListener: ChangeListener | null = null
  private layerChangeListener: ChangeListener | null = null
  private propertyWindowListener: ChangeListener | null = null

  create(element: Elements) {
    this.created.push(element)
    this.notifyBasedOnType(element)
  }

  destroy(element: Elements) {
    this.created = this.created.filter(el => el.id !== element.id)
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
    this.notifyBasedOnType(element)
    this.notifyPropertyWindowChanges()
  }

  deselect(element: Elements) {
    this.selected = this.selected.filter(el => el.id !== element.id)
    element.selected = false
    this.notifyBasedOnType(element)
    this.notifyPropertyWindowChanges()
  }

  deselectAll() {
    this.selected.forEach(element => {
      element.setSelect(false)
    })
    this.selected = []

    this.notifyEllipseChanges()
    this.notifyLineChanges()
    this.notifyRectChanges()
    this.notifyTextChanges()
    this.notifyImageChanges()
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

    this.notifyBasedOnType(this.created.find(el => el.id === id) as Elements)
    this.notifyPropertyWindowChanges()
  }

  updateSize(id: number, size: Size) {
    this.selected.forEach(element => {
      if (element.id === id) {
        element.size = size
      }
    })

    this.notifyBasedOnType(this.created.find(el => el.id === id) as Elements)
    this.notifyPropertyWindowChanges()
  }

  updateColor(id: number, color: string) {
    this.created.forEach(element => {
      if (element.id === id && (element instanceof Shapes || element instanceof Text)) {
        element.color = color
      }
    })
    this.notifyPropertyWindowChanges()
    this.notifyBasedOnType(this.created.find(el => el.id === id) as Elements)
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
    this.notifyBasedOnType(this.created.find(el => el.id === id) as Elements)
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

  getText(): Array<Text> {
    return this.created.filter(el => el instanceof Text) as Array<Text>
  }

  getImage(): Array<Image> {
    return this.created.filter(el => el instanceof Image) as Array<Image>
  }

  listenForRectChanges(listener: ChangeListener) {
    if (this.rectChangeListener) {
      this.rectChangeListener = null
    }

    this.rectChangeListener = listener
  }

  listenForEllipseChanges(listener: ChangeListener) {
    if (this.ellipseChangeListener) {
      this.ellipseChangeListener = null
    }

    this.ellipseChangeListener = listener
  }

  listenForLineChanges(listener: ChangeListener) {
    if (this.lineChangeListener) {
      this.lineChangeListener = null
    }

    this.lineChangeListener = listener
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

  private notifyRectChanges() {
    if (this.rectChangeListener) {
      this.rectChangeListener()
    }
  }

  private notifyLineChanges() {
    if (this.lineChangeListener) {
      this.lineChangeListener()
    }
  }

  private notifyEllipseChanges() {
    if (this.ellipseChangeListener) {
      this.ellipseChangeListener()
    }
  }

  private notifyTextChanges() {
    if (this.textChangeListener) {
      this.textChangeListener()
    }
  }

  private notifyImageChanges() {
    if (this.imageChangeListener) {
      this.imageChangeListener()
    }
  }

  notifyBasedOnType(element: Elements) {
    this.notifyLayerChanges()

    if (element instanceof Rectangle) {
      this.notifyRectChanges()
    } else if (element instanceof Line) {
      this.notifyLineChanges()
    } else if (element instanceof Ellipse) {
      this.notifyEllipseChanges()
    } else if (element instanceof Text) {
      this.notifyTextChanges()
    } else if (element instanceof Image) {
      this.notifyImageChanges()
    }
  }
}

export default CreatedComposite
