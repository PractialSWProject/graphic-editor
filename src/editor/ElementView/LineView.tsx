import { useState } from 'react'
import { Group, Line } from 'react-konva'
import CreatedComposite from '../../models/composite/created'
import { KonvaEventObject } from 'konva/lib/Node'

interface Props {
  createdComposite: CreatedComposite
  handleMove:  (e: KonvaEventObject<DragEvent>) => void
}

const LineView = ({ createdComposite, handleMove }: Props) => {
  const [updateLineFlag, setUpdateLineFlag] = useState(false)

  createdComposite.listenForLineChanges(() => {
    setUpdateLineFlag(!updateLineFlag)
  })

  const lines = createdComposite.getLines()

  return (
    <>
      {lines.map(el => (
        <Group key={el.id}>
          <Line
            id={el.id.toString()}
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
            onDragEnd={e => handleMove(e)}
            draggable
          />
        </Group>
      ))}
    </>
  )
}

export default LineView
