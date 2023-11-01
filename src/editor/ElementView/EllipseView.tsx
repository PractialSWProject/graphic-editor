import { useState } from 'react'
import { Ellipse, Group } from 'react-konva'
import CreatedComposite from '../../models/composite/created'
import { KonvaEventObject } from 'konva/lib/Node'

interface Props {
  createdComposite: CreatedComposite
  handleMove: (e: KonvaEventObject<DragEvent>) => void
}

const EllipseView = ({ createdComposite, handleMove }: Props) => {
  const [updateFlag, setUpdateFlag] = useState(false)

  createdComposite.listenForEllipseChanges(() => {
    setUpdateFlag(!updateFlag)
  })

  const ellipses = createdComposite.getEllipse()

  return (
    <>
      {ellipses.map(el => (
        <Group key={el.id}>
          <Ellipse
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
            draggable
          />
        </Group>
      ))}
    </>
  )
}

export default EllipseView
