import { useState } from 'react'
import { Group, Rect } from 'react-konva'
import CreatedComposite from '../../models/composite/created'
import Rectangle from '../../models/Elements/Shapes/rectangle'

interface Props {
  createdComposite: CreatedComposite
}

const RectView = ({ createdComposite }: Props) => {
  const [updateRectFlag, setUpdateRectFlag] = useState(false)

  createdComposite.listenForRectChanges(() => {
    setUpdateRectFlag(!updateRectFlag)
  })

  const rectangles = createdComposite.getRectangles()

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
      {rectangles.map(el => (
        <Group key={el.id}>
          <Rect
            x={el.properties.position.x}
            y={el.properties.position.y}
            width={el.properties.size.width}
            height={el.properties.size.height}
            fill={el.properties.color}
            shadowBlur={10}
            shadowColor="lime"
            shadowEnabled={el.selected ? true : false}
            // zIndex={el.properties.zIndex}
            onMouseDown={() => handleClick(el)}
            onDragEnd={e => {
              move(el.id, e.target.x(), e.target.y())
            }}
            draggable
          />
        </Group>
      ))}
    </>
  )
}

export default RectView
