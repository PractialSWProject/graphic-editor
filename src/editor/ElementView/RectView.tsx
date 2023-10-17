import { Dispatch, SetStateAction } from 'react'
import { Rect } from 'react-konva'
import { ShapeElementT } from '../type'

interface Props {
  rects: ShapeElementT[]
  setRects: Dispatch<SetStateAction<ShapeElementT[]>>
}

const RectView = ({ rects, setRects }: Props) => {
  const updatePosition = (id: number, x: number, y: number) => {
    const newRectElement = rects.map(el => {
      if (el.id === id) {
        el.shape.setPosition({ x, y })
        return {
          id: el.id,
          variant: el.variant,
          shape: el.shape
        }
      } else {
        return el
      }
    })
    setRects(newRectElement)
  }
  return (
    <>
      {rects.map(el => (
        <Rect
          key={el.id}
          x={el.shape.getPosition().x}
          y={el.shape.getPosition().y}
          width={el.shape.getSize().width}
          height={el.shape.getSize().height}
          fill={el.variant === 'filled' ? el.shape.getColor() : undefined}
          stroke={el.variant === 'outlined' ? el.shape.getColor() : undefined}
          onDragEnd={e => {
            updatePosition(el.id, e.target.x(), e.target.y())
          }}
          draggable
        />
      ))}
    </>
  )
}

export default RectView
