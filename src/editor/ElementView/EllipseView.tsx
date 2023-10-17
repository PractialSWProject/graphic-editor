import { Ellipse } from 'react-konva'
import { ShapeElementT } from '../type'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  ellipses: ShapeElementT[]
  setEllipses: Dispatch<SetStateAction<ShapeElementT[]>>
}

const EllipseView = ({ ellipses, setEllipses }: Props) => {
  const updatePosition = (id: number, x: number, y: number) => {
    const newEllipseElement = ellipses.map(el => {
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
    setEllipses(newEllipseElement)
  }
  return (
    <>
      {ellipses.map(el => (
        <Ellipse
          key={el.id}
          x={el.shape.getPosition().x}
          y={el.shape.getPosition().y}
          width={el.shape.getSize().width}
          height={el.shape.getSize().height}
          radiusX={el.shape.getSize().width / 2}
          radiusY={el.shape.getSize().height / 2}
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

export default EllipseView
