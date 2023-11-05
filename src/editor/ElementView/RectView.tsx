import { Group } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { Rect } from 'react-konva'
import Elements from '../../models/Elements'

interface Props {
  el: Elements
  handleMove: (e: KonvaEventObject<DragEvent>) => void
  handleEnlarge: (e: KonvaEventObject<Event>) => void
}

const RectView = ({ el, handleMove, handleEnlarge }: Props) => {
  if (el.deleted) return null

  return (
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
  )
}

export default RectView
