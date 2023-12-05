import { KonvaEventObject } from 'konva/lib/Node'
import { Ellipse as EllipseK } from 'react-konva'
import { Shapes } from '../../models/Elements'

interface Props {
  el: Shapes
  handleMove: (e: KonvaEventObject<DragEvent>) => void
  handleEnlarge: (e: KonvaEventObject<Event>) => void
}

const EllipseView = ({ el, handleMove, handleEnlarge }: Props) => {
  return (
    <EllipseK
      key={el.id}
      id={el.id.toString()}
      x={el.position.x}
      y={el.position.y}
      width={el.size.width}
      height={el.size.height}
      radiusX={el.size.width / 2}
      radiusY={el.size.height / 2}
      fill={el.color}
      shadowBlur={10}
      shadowColor="lime"
      shadowEnabled={el.selected ? true : false}
      onDragEnd={e => handleMove(e)}
      onTransformEnd={e => handleEnlarge(e)}
      draggable
    />
  )
}

export default EllipseView
