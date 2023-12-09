// elementListSingleton.ts
import { Position, Size } from './abstract'
import { ConcreteElement, ConcreteShape, ConcreteText } from './concrete'

type ChangeListener = () => void

class ElementListSingleton {
  private static instance: ElementListSingleton
  private elements: ConcreteElement[] = []
  private selected: ConcreteElement[] = []

  private constructor() {}

  private elementChangeListener: ChangeListener | null = null
  private layerChangeListener: ChangeListener | null = null
  private propertyWindowListener: ChangeListener | null = null

  public static getInstance(): ElementListSingleton {
    if (!ElementListSingleton.instance) {
      ElementListSingleton.instance = new ElementListSingleton()
    }
    return ElementListSingleton.instance
  }

  public addElement(element: ConcreteElement): void {
    this.elements.push(element)
    this.notifyEditorAndLayerChanges()
  }

  public getElements(): ConcreteElement[] {
    return this.elements
  }

  public select(element: ConcreteElement): void {
    this.selected.push(element)
    element.setIsSelected(true)

    this.notifyAllChanges()
  }

  public deselect(element: ConcreteElement): void {
    this.selected = this.selected.filter(el => el.getId() !== element.getId())
    element.setIsSelected(false)

    this.notifyAllChanges()
  }

  public deselectAll(): void {
    this.selected.forEach(element => {
      element.setIsSelected(false)
    })
    this.selected = []

    this.notifyAllChanges()
  }

  public isInSelectionManager(element: ConcreteElement): boolean {
    return this.selected.some(selectedElement => {
      return selectedElement.getId() === element.getId()
    })
  }

  public getSelected(): ConcreteElement[] {
    return this.selected
  }

  public updatePosition(id: number, position: Position): void {
    this.selected.forEach(element => {
      if (element.getId() === id) {
        element.setPosition(position)
      }
    })
    this.notifyEditorAndPropertyWindowChanges()
  }

  public updateSize(id: number, size: Size): void {
    this.selected.forEach(element => {
      if (element.getId() === id) {
        element.setSize(size)
      }
    })
    this.notifyEditorAndPropertyWindowChanges()
  }

  public updateColor(id: number, color: string): void {
    this.selected.forEach(element => {
      if (element.getId() === id && (element instanceof ConcreteShape || element instanceof ConcreteText)) {
        element.setColor(color)
      }
    })
    this.notifyEditorAndPropertyWindowChanges()
  }

  public updateFontSize(id: number, fontSize: number): void {
    this.elements.forEach(element => {
      if (element.getId() === id && element instanceof ConcreteText) {
        element.setFontSize(fontSize)
      }
    })
    this.notifyEditorAndPropertyWindowChanges()
  }

  public updateZIndex(id: number, zIndex: number): void {
    this.elements.forEach(element => {
      if (element.getId() === id) {
        element.setZIndex(zIndex)
      }
    })
    this.notifyEditorAndLayerChanges()
  }

  // listeners
  public setElementChangeListener(listener: ChangeListener): void {
    this.elementChangeListener = listener
  }

  public setLayerChangeListener(listener: ChangeListener): void {
    this.layerChangeListener = listener
  }

  public setPropertyWindowListener(listener: ChangeListener): void {
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

  private notifyEditorAndLayerChanges() {
    this.notifyElementChanges()
    this.notifyLayerChanges()
  }

  private notifyEditorAndPropertyWindowChanges() {
    this.notifyElementChanges()
    this.notifyPropertyWindowChanges()
  }

  private notifyAllChanges() {
    this.notifyElementChanges()
    this.notifyLayerChanges()
    this.notifyPropertyWindowChanges()
  }
}

export default ElementListSingleton
