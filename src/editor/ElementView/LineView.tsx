import { useState } from 'react'
import { Group, Line } from 'react-konva'
import CreatedComposite from '../../models/composite/created'
import Rectangle from '../../models/Elements/Shapes/rectangle'

interface Props {
  createdComposite: CreatedComposite
}

const LineView = ({ createdComposite }: Props) => {
  const [updateLineFlag, setUpdateLineFlag] = useState(false)

  createdComposite.listenForLineChanges(() => {
    setUpdateLineFlag(!updateLineFlag)
  })

  const lines = createdComposite.getLines()

  const move = (id: number, x: number, y: number) => {
    createdComposite.updatePosition(id, { x, y })
  }

  const handleClick = (el: Rectangle) => {
    if (createdComposite.isInSelectionManager(el)) {
      createdComposite.deselect(el)
    } else {
      createdComposite.select(el)
    }
  }
  return (
    <>
      {lines.map(el => (
        <Group key={el.id}>
          <Line
            x={el.properties.position.x}
            y={el.properties.position.y}
            points={[
              el.properties.position.x,
              el.properties.position.y,
              el.properties.position.x + el.properties.size.width,
              el.properties.position.y + el.properties.size.height
            ]}
            shadowBlur={10}
            shadowColor="lime"
            shadowEnabled={el.selected ? true : false}
            stroke={el.properties.color}
            strokeWidth={5}
            onDragEnd={e => {
              move(el.id, e.target.x(), e.target.y())
            }}
            onMouseDown={() => {
              handleClick(el)
            }}
            draggable
          />
        </Group>
      ))}
    </>
  )
}

export default LineView
