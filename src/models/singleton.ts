import { Position, Size } from './elementAbstract'
import { ConcreteElement, ConcreteShape, ConcreteText } from './elementConcrete'
import { LayerObserver, EditorObserver, PropertyWindowObserver, Observer } from './observer'

const layerObserver = LayerObserver.getInstance()
const editorObserver = EditorObserver.getInstance()
const propertyWindowObserver = PropertyWindowObserver.getInstance()
class ElementListHandler {
  private static instance: ElementListHandler
  private elements: ConcreteElement[] = []
  private selected: ConcreteElement[] = []

  private constructor() {}

  private observers: Observer[] = [layerObserver, editorObserver, propertyWindowObserver]

  public notify(): void {
    for (const observer of this.observers) {
      observer.update()
    }
  }

  public static getInstance(): ElementListHandler {
    if (!ElementListHandler.instance) {
      ElementListHandler.instance = new ElementListHandler()
    }
    return ElementListHandler.instance
  }

  public addElement(element: ConcreteElement): void {
    this.elements.push(element)
    this.notify()
  }

  public getElements(): ConcreteElement[] {
    return this.elements
  }

  public select(element: ConcreteElement): void {
    this.selected.push(element)
    element.setIsSelected(true)
    this.notify()
  }

  public deselect(element: ConcreteElement): void {
    this.selected = this.selected.filter(el => el.getId() !== element.getId())
    element.setIsSelected(false)
    this.notify()
  }

  public deselectAll(): void {
    this.selected.forEach(element => {
      element.setIsSelected(false)
    })
    this.selected = []
    this.notify()
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
    this.notify()
  }

  public updateSize(id: number, size: Size): void {
    this.selected.forEach(element => {
      if (element.getId() === id) {
        element.setSize(size)
      }
    })
    this.notify()
  }

  public updateColor(id: number, color: string): void {
    this.selected.forEach(element => {
      if (element.getId() === id && (element instanceof ConcreteShape || element instanceof ConcreteText)) {
        element.setColor(color)
      }
    })
    this.notify()
  }

  public updateFontSize(id: number, fontSize: number): void {
    this.elements.forEach(element => {
      if (element.getId() === id && element instanceof ConcreteText) {
        element.setFontSize(fontSize)
      }
    })
    this.notify()
  }

  public updateZIndex(id: number, zIndex: number): void {
    this.elements.forEach(element => {
      if (element.getId() === id) {
        element.setZIndex(zIndex)
      }
    })
    this.notify()
  }
}

export default ElementListHandler
