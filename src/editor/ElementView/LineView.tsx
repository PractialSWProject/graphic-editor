import { useState } from 'react'
import { Group } from 'react-konva'
import CreatedComposite from '../../models/composite/created'
import { KonvaEventObject } from 'konva/lib/Node'
import { Line } from 'react-konva'

interface Props {
  createdComposite: CreatedComposite
  handleMove: (e: KonvaEventObject<DragEvent>, isLine?: boolean) => void
  handleEnlarge: (e: KonvaEventObject<Event>, isLine?: boolean) => void
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
            points={[el.position.x, el.position.y, el.position.x + el.size.width, el.position.y + el.size.height]}
            shadowBlur={10}
            shadowColor="lime"
            shadowEnabled={el.selected ? true : false}
            stroke={el.color}
            strokeWidth={5}
            onDragEnd={e => handleMove(e, true)}
            onTransformEnd={e => handleEnlarge(e, true)}
            zIndex={el.zIndex}
            draggable
          />
        </Group>
      ))}
    </>
  )
}

export default LineView
