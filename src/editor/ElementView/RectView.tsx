import { Dispatch, SetStateAction } from 'react'
import { Rect } from 'react-konva'
import { ElementT, ShapeElementT } from '../type'
import SelectionManager from '../../models/composite/selected'
import CreationManager from '../../models/composite/created'
interface Props {
  elements: ElementT[]
  setElements: Dispatch<SetStateAction<ElementT[]>>
  selectionManager: SelectionManager
  creationManager: CreationManager
}

const RectView = ({ elements, setElements, selectionManager, creationManager }: Props) => {
  // const updatePosition = (id: number, x: number, y: number) => {
  //   const newRectElement = rects.map(el => {
  //     if (el.id === id) {
  //       el.shape.setPosition({ x, y })
  //       return {
  //         id: el.id,
  //         variant: el.variant,
  //         shape: el.shape
  //       }
  //     } else {
  //       return el
  //     }
  //   })
  //   // setRects(newRectElement)
  // }

  const handleRectClick = (el: ShapeElementT) => {
    if (selectionManager.isInSelectionManager(el)) {
      console.log('removed')
      el.shape.setSelected(false)
      selectionManager.remove(el)
      console.log(selectionManager.get())
      console.log(selectionManager.isInSelectionManager(el))
    } else {
      console.log('added!')
      el.shape.setSelected(true)
      selectionManager.select(el)
      console.log(selectionManager.get())
      console.log(selectionManager.isInSelectionManager(el))
    }
  }
  const rectangles = creationManager.get().filter((el): el is ShapeElementT => {
    return 'variant' in el && (el.variant === 'filled' || el.variant === 'outlined')
  })

  console.log('rectangles in creationManager:', rectangles)
  return (
    <>
      {rectangles.map(el => (
        <Rect
          key={el.id}
          x={el.shape.getPosition().x}
          y={el.shape.getPosition().y}
          width={el.shape.getSize().width}
          height={el.shape.getSize().height}
          fill={el.variant === 'filled' ? el.shape.getColor() : undefined}
          stroke={el.variant === 'outlined' ? el.shape.getColor() : undefined}
          dash={selectionManager.isInSelectionManager(el) ? [5, 5] : undefined}
          onMouseDown={() => handleRectClick(el)}
          // onDragEnd={e => {
          //   updatePosition(el.id, e.target.x(), e.target.y())
          // }}
          draggable
        />
      ))}
    </>
  )
}

export default RectView
