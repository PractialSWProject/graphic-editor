import { KonvaEventObject } from 'konva/lib/Node'
import { Text as TextK } from 'react-konva'
import { ConcreteText } from '../../models/concrete'

interface Props {
  el: ConcreteText
  handleMove: (e: KonvaEventObject<DragEvent>, isLine?: boolean) => void
  handleEnlarge: (e: KonvaEventObject<Event>, isLine?: boolean) => void
}

const TextView = ({ el, handleMove, handleEnlarge }: Props) => {
  return (
    <TextK
      id={el.getId().toString()}
      x={el.getPosition().x}
      y={el.getPosition().y}
      fill={el.getColor()}
      text={el.getContent()}
      fontSize={el.getFontSize()}
      shadowBlur={10}
      shadowColor="lime"
      shadowEnabled={el.getIsSelected() ? true : false}
      onDragEnd={e => handleMove(e)}
      onTransformEnd={e => handleEnlarge(e, false)}
      draggable
    />
  )
}

export default TextView
