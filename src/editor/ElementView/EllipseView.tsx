import { KonvaEventObject } from 'konva/lib/Node'
import { Ellipse as EllipseK } from 'react-konva'
import { ConcreteShape } from '../../models/concrete'

interface Props {
  el: ConcreteShape
  handleMove: (e: KonvaEventObject<DragEvent>) => void
  handleEnlarge: (e: KonvaEventObject<Event>) => void
}

const EllipseView = ({ el, handleMove, handleEnlarge }: Props) => {

  return (
    <EllipseK
      id={el.getId().toString()}
      x={el.getPosition().x}
      y={el.getPosition().y}
      width={el.getSize().width}
      height={el.getSize().height}
      radiusX={el.getSize().width / 2}
      radiusY={el.getSize().height / 2}
      fill={el.getColor()}
      shadowBlur={10}
      shadowColor="lime"
      shadowEnabled={el.getIsSelected() ? true : false}
      onDragEnd={e => handleMove(e)}
      onTransformEnd={e => handleEnlarge(e)}
      draggable
    />
  )
}

export default EllipseView
