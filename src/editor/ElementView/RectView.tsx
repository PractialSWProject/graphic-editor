import { KonvaEventObject } from 'konva/lib/Node'
import { Rect } from 'react-konva'
import { ConcreteShape } from '../../models/elementConcrete'

interface Props {
  el: ConcreteShape
  handleMove: (e: KonvaEventObject<DragEvent>) => void
  handleEnlarge: (e: KonvaEventObject<Event>) => void
}

const RectView = ({ el, handleMove, handleEnlarge }: Props) => {
  return (
    <Rect
      id={el.getId().toString()}
      x={el.getPosition().x}
      y={el.getPosition().y}
      width={el.getSize().width}
      height={el.getSize().height}
      fill={el.getColor()}
      shadowBlur={10}
      shadowColor="lime"
      shadowEnabled={el.getIsSelected()? true : false}
      onDragEnd={e => handleMove(e)}
      onTransformEnd={e => handleEnlarge(e)}
      draggable
    />
  )
}

export default RectView
