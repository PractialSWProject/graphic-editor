import { ConcreteElement } from '../concrete'
import ElementListSingleton from '../singleton'

const elementListSingleton = ElementListSingleton.getInstance()
// State 인터페이스
abstract class ShiftState {
  public abstract handleClickElement(element: ConcreteElement | undefined): void
}

// ConcreteState: Shift 키가 눌리지 않은 상태
class NotPressedState extends ShiftState {
  public handleClickElement(element: ConcreteElement): void {
    if (element) {
      elementListSingleton.deselectAll()
      elementListSingleton.select(element)
    } else {
      elementListSingleton.deselectAll()
    }
  }
}

// ConcreteState: Shift 키가 눌린 상태
class PressedState extends ShiftState {
  public handleClickElement(element: ConcreteElement): void {
    if (element) {
      if (elementListSingleton.isInSelectionManager(element)) {
        elementListSingleton.deselect(element)
      } else {
        elementListSingleton.select(element)
      }
    }
  }
}

// Context 클래스
class KeyboardState {
  private currentState: ShiftState

  constructor() {
    this.currentState = new NotPressedState()
  }

  pressShift(): void {
    this.currentState = new PressedState()
  }

  releaseShift(): void {
    this.currentState = new NotPressedState()
  }

  handleClickElement(element: ConcreteElement | undefined): void {
    this.currentState.handleClickElement(element)
  }
}

export default KeyboardState
