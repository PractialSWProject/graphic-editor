import { KonvaEventObject } from 'konva/lib/Node'
import { Line } from 'react-konva'
import { ConcreteShape } from '../../models/concrete'
interface Props {
  el: ConcreteShape
  handleMove: (e: KonvaEventObject<DragEvent>, isLine?: boolean) => void
  handleEnlarge: (e: KonvaEventObject<Event>, isLine?: boolean) => void
}

const LineView = ({ el, handleMove, handleEnlarge }: Props) => {
  return (
    <Line
      id={el.getId().toString()}
      x={0}
      y={0}
      points={[
        el.getPosition().x,
        el.getPosition().y,
        el.getPosition().x + el.getSize().width,
        el.getPosition().y + el.getSize().height
      ]}
      shadowBlur={10}
      shadowColor="lime"
      shadowEnabled={el.getIsSelected() ? true : false}
      stroke={el.getColor()}
      strokeWidth={5}
      onDragEnd={e => handleMove(e, true)}
      onTransformEnd={e => handleEnlarge(e, true)}
      draggable
    />
  )
}

export default LineView
