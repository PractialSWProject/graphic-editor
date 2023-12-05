import { KonvaEventObject } from 'konva/lib/Node'
import { Text as TextK } from 'react-konva'
import Text from '../../models/Elements/Text'

interface Props {
  el: Text
  handleMove: (e: KonvaEventObject<DragEvent>, isLine?: boolean) => void
  handleEnlarge: (e: KonvaEventObject<Event>, isLine?: boolean) => void
}

const TextView = ({ el, handleMove, handleEnlarge }: Props) => {
  return (
    <TextK
      id={el.id.toString()}
      x={el.position.x}
      y={el.position.y}
      fill={el.color}
      text={el.content}
      fontSize={el.fontSize}
      shadowBlur={10}
      shadowColor="lime"
      shadowEnabled={el.selected ? true : false}
      onDragEnd={e => handleMove(e)}
      onTransformEnd={e => handleEnlarge(e, false)}
      draggable
    />
  )
}

export default TextView
