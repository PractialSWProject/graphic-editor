import { useState } from 'react'
import { Group } from 'react-konva'
import CreatedComposite from '../../models/composite/created'
import { KonvaEventObject } from 'konva/lib/Node'
import { Line } from 'react-konva'

interface Props {
  createdComposite: CreatedComposite
  handleMove: (e: KonvaEventObject<DragEvent>, isLine?: boolean) => void
  handleEnlarge: (e: KonvaEventObject<Event>) => void
}

const LineView = ({ createdComposite, handleMove, handleEnlarge }: Props) => {
  const [updateLineFlag, setUpdateLineFlag] = useState(false)

  createdComposite.listenForLineChanges(() => {
    setUpdateLineFlag(!updateLineFlag)
  })

  const lines = createdComposite.getLines()
  console.log('lines', lines)

  return (
    <>
      {lines.map(el => (
        <Group key={el.id}>
          <Line
            id={el.id.toString()}
            x={0}
            y={0}
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
            onDragEnd={e => handleMove(e, true)}
            onTransformEnd={e => handleEnlarge(e)}
            zIndex={el.properties.zIndex}
            draggable
          />
        </Group>
      ))}
    </>
  )
}

export default LineView
