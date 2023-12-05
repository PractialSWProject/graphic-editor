import { KonvaEventObject } from 'konva/lib/Node'
import { Image as ImageK } from 'react-konva'
import Image from '../../models/Elements/Image'

interface Props {
  el: Image
  handleMove: (e: KonvaEventObject<DragEvent>, isLine?: boolean) => void
  handleEnlarge: (e: KonvaEventObject<Event>, isLine?: boolean) => void
}

const ImageView = ({ el, handleMove, handleEnlarge }: Props) => {
  const image = new window.Image()
  image.src = el.url

  return (
    <ImageK
      id={el.id.toString()}
      x={el.position.x}
      y={el.position.y}
      width={el.size.width}
      height={el.size.height}
      image={image}
      shadowBlur={10}
      shadowColor="lime"
      shadowEnabled={el.selected ? true : false}
      onDragEnd={e => handleMove(e)}
      onTransformEnd={e => handleEnlarge(e)}
      draggable
    />
  )
}

export default ImageView
