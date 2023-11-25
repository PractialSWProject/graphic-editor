import Elements from '../Elements'
import { createdComposite } from '../../editor'

// State 인터페이스
abstract class ShiftState {
  public abstract handleClickElement(element: Elements | undefined): void
}

// ConcreteState: Shift 키가 눌리지 않은 상태
class NotPressedState extends ShiftState {
  public handleClickElement(element: Elements): void {
    if (element) {
      createdComposite.deselectAll()
      createdComposite.select(element)
    } else {
      createdComposite.deselectAll()
    }
  }
}

// ConcreteState: Shift 키가 눌린 상태
class PressedState extends ShiftState {
  public handleClickElement(element: Elements): void {
    if (element) {
      if (createdComposite.isInSelectionManager(element)) {
        createdComposite.deselect(element)
      } else {
        createdComposite.select(element)
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

  handleClickElement(element: Elements | undefined): void {
    this.currentState.handleClickElement(element)
  }
}

export default KeyboardState
