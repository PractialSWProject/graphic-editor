import { KonvaEventObject } from 'konva/lib/Node'
import { Image as ImageK } from 'react-konva'
import { ConcreteImage } from '../../models/elementConcrete'

interface Props {
  el: ConcreteImage
  handleMove: (e: KonvaEventObject<DragEvent>, isLine?: boolean) => void
  handleEnlarge: (e: KonvaEventObject<Event>, isLine?: boolean) => void
}

const ImageView = ({ el, handleMove, handleEnlarge }: Props) => {
  const image = new window.Image()
  image.src = el.getUrl()

  return (
    <ImageK
      id={el.getId().toString()}
      x={el.getPosition().x}
      y={el.getPosition().y}
      width={el.getSize().width}
      height={el.getSize().height}
      image={image}
      shadowBlur={10}
      shadowColor="lime"
      shadowEnabled={el.getIsSelected() ? true : false}
      onDragEnd={e => handleMove(e)}
      onTransformEnd={e => handleEnlarge(e)}
      draggable
      visible={el.getIsVisible()}
    />
  )
}

export default ImageView
