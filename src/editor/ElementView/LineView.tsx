import { Line } from 'react-konva'
import { ShapeElementT } from '../type'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  lines: ShapeElementT[]
  setLines: Dispatch<SetStateAction<ShapeElementT[]>>
}

const LineView = ({ lines, setLines }: Props) => {
  const updatePosition = (id: number, x: number, y: number) => {
    const newLineElement = lines.map(el => {
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
    setLines(newLineElement)
  }
  return (
    <>
      {lines.map(el => (
        <Line
          key={el.id}
          x={el.shape.getPosition().x}
          y={el.shape.getPosition().y}
          points={[
            el.shape.getPosition().x,
            el.shape.getPosition().y,
            el.shape.getPosition().x + el.shape.getSize().width,
            el.shape.getPosition().y + el.shape.getSize().height
          ]}
          stroke={el.shape.getColor()}
          onDragEnd={e => {
            updatePosition(el.id, e.target.x(), e.target.y())
          }}
          draggable
        />
      ))}
    </>
  )
}

export default LineView
