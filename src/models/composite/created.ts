import { ElementT } from '../../editor/type'

class CreationManager {
  private created: Array<ElementT> = []

  create(element: ElementT) { 
    this.created.push(element)
  }

  destroy(element: ElementT) {
    this.created = this.created.filter((el) => el.id !== element.id)
  }

  clear() {
    this.created = []
  }

  get(): Array<ElementT> {
    return this.created
  }

  isInSelectionManager(element: ElementT): boolean {
    return this.created.some(createdElement => {
      return element.id === createdElement.id;
    });
  }
}

export default CreationManager
