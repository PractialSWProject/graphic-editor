import { useState } from 'react'
import { Ellipse, Group, Transformer } from 'react-konva'
import CreatedComposite from '../../models/composite/created'
import { KonvaEventObject } from 'konva/lib/Node'
import Konva from 'konva'

interface Props {
  createdComposite: CreatedComposite
  handleMove: (e: KonvaEventObject<DragEvent>) => void
  handleEnlarge: (e: KonvaEventObject<Event>) => void
  shapeRef: React.MutableRefObject<Konva.Ellipse | null>
  trRef: React.MutableRefObject<Konva.Transformer | null>
}

const EllipseView = ({ createdComposite, handleMove, handleEnlarge, shapeRef, trRef }: Props) => {
  const [updateFlag, setUpdateFlag] = useState(false)

  createdComposite.listenForEllipseChanges(() => {
    setUpdateFlag(!updateFlag)
  })

  const ellipses = createdComposite.getEllipse()

  return (
    <>
      {ellipses.map(el => (
        <Group key={el.id}>
          {el.selected && (
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox
                }
                return newBox
              }}
            />
          )}
          <Ellipse
            ref={shapeRef}
            id={el.id.toString()}
            x={el.properties.position.x}
            y={el.properties.position.y}
            width={el.properties.size.width}
            height={el.properties.size.height}
            radiusX={el.properties.size.width / 2}
            radiusY={el.properties.size.height / 2}
            fill={el.properties.color}
            shadowBlur={10}
            shadowColor="lime"
            shadowEnabled={el.selected ? true : false}
            onDragEnd={e => handleMove(e)}
            onTransformEnd={e => handleEnlarge(e)}
            draggable
          />
        </Group>
      ))}
    </>
  )
}

export default EllipseView
