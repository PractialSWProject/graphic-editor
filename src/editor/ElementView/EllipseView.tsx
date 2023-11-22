import { useState } from 'react'
import { Group } from 'react-konva'
import CreatedComposite from '../../models/composite/created'
import { KonvaEventObject } from 'konva/lib/Node'
import { Ellipse } from 'react-konva'

interface Props {
  createdComposite: CreatedComposite
  handleMove: (e: KonvaEventObject<DragEvent>) => void
  handleEnlarge: (e: KonvaEventObject<Event>) => void
}

const EllipseView = ({ createdComposite, handleMove, handleEnlarge }: Props) => {
  const [updateFlag, setUpdateFlag] = useState(false)

  createdComposite.listenForEllipseChanges(() => {
    setUpdateFlag(!updateFlag)
  })

  const ellipses = createdComposite.getEllipse()

  return (
    <>
      {ellipses.map(el => {
        return (
          <Group key={el.id}>
            <Ellipse
              id={el.id.toString()}
              x={el.position.x}
              y={el.position.y}
              width={el.size.width}
              height={el.size.height}
              radiusX={el.size.width / 2}
              radiusY={el.size.height / 2}
              fill={el.color}
              shadowBlur={10}
              shadowColor="lime"
              shadowEnabled={el.selected ? true : false}
              onDragEnd={e => handleMove(e)}
              onTransformEnd={e => handleEnlarge(e)}
              zIndex={el.zIndex}
              draggable
            />
          </Group>
        )
      })}
    </>
  )
}

export default EllipseView
