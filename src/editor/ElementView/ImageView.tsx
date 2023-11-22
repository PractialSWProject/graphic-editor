import { useState } from 'react'
import { Group } from 'react-konva'
import CreatedComposite from '../../models/composite/created'
import { KonvaEventObject } from 'konva/lib/Node'
import { Image } from 'react-konva'

interface Props {
  createdComposite: CreatedComposite
  handleMove: (e: KonvaEventObject<DragEvent>, isLine?: boolean) => void
  handleEnlarge: (e: KonvaEventObject<Event>, isLine?: boolean) => void
}

const ImageView = ({ createdComposite, handleMove, handleEnlarge }: Props) => {
  const [updateLineFlag, setUpdateLineFlag] = useState(false)

  createdComposite.listenForImageChanges(() => {
    setUpdateLineFlag(!updateLineFlag)
  })

  const images = createdComposite.getImage()

  return (
    <>
      {images.map(el => {
        const image = new window.Image()
        image.src = el.url

        return (
          <Group key={el.id}>
            <Image
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
              zIndex={el.zIndex}
              draggable
            />
          </Group>
        )
      })}
    </>
  )
}

export default ImageView
