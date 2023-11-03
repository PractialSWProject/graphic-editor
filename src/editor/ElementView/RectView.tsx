import { useState } from 'react'
import { Group } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'
import CreatedComposite from '../../models/composite/created'
import { Rect } from 'react-konva'

interface Props {
  createdComposite: CreatedComposite
  handleMove: (e: KonvaEventObject<DragEvent>) => void
  handleEnlarge: (e: KonvaEventObject<Event>) => void
}

const RectView = ({ createdComposite, handleMove, handleEnlarge }: Props) => {
  const [updateRectFlag, setUpdateRectFlag] = useState(false)

  createdComposite.listenForRectChanges(() => {
    setUpdateRectFlag(!updateRectFlag)
  })

  const rectangles = createdComposite.getRectangles()

  return (
    <>
      {rectangles.map(el => (
        <Group key={el.id}>
          <Rect
            id={el.id.toString()}
            x={el.properties.position.x}
            y={el.properties.position.y}
            width={el.properties.size.width}
            height={el.properties.size.height}
            fill={el.properties.color}
            shadowBlur={10}
            shadowColor="lime"
            shadowEnabled={el.selected ? true : false}
            onDragEnd={e => handleMove(e)}
            onTransformEnd={e => handleEnlarge(e)}
            zIndex={el.properties.zIndex}
            draggable
          />
        </Group>
      ))}
    </>
  )
}

export default RectView
