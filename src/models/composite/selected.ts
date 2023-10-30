import { Elements } from '..'
import { ElementT } from '../../editor/type'

class SelectionManager {
  private selected: Array<ElementT> = []

  select(element: ElementT) {
    
    
    this.selected.push(element)
  }

  // TODO: Fix this
  remove(element: ElementT) {
    this.selected = this.selected.filter((el) => el.id !== element.id)
  }

  clear() {
    this.selected = []
  }

  get(): Array<ElementT> {
    return this.selected
  }

  isInSelectionManager(element: ElementT): boolean {
    return this.selected.some(selectedElement => {
      return element.id === selectedElement.id;
    });
  }
}

export default SelectionManager
