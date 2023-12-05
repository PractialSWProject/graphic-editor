import { KonvaEventObject } from 'konva/lib/Node'
import { Line } from 'react-konva'
import { Shapes } from '../../models/Elements'

interface Props {
  el: Shapes
  handleMove: (e: KonvaEventObject<DragEvent>, isLine?: boolean) => void
  handleEnlarge: (e: KonvaEventObject<Event>, isLine?: boolean) => void
}

const LineView = ({ el, handleMove, handleEnlarge }: Props) => {
  return (
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
      draggable
    />
  )
}

export default LineView
