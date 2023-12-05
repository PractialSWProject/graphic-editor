import { KonvaEventObject } from 'konva/lib/Node'
import { Line } from 'react-konva'
import Elements from '../../models/Elements'

interface Props {
  el: Elements
  handleMove: (e: KonvaEventObject<DragEvent>, isLine?: boolean) => void
  handleEnlarge: (e: KonvaEventObject<Event>, isLine?: boolean) => void
}

const LineView = ({ el, handleMove, handleEnlarge }: Props) => {
  if (el.deleted) return null
  return (
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
      onTransformEnd={e => handleEnlarge(e, true)}
      zIndex={el.properties.zIndex}
      draggable
    />
  )
}

export default LineView
