import { useState } from 'react'
import { Group } from 'react-konva'
import CreatedComposite from '../../models/composite/created'
import { KonvaEventObject } from 'konva/lib/Node'
import { Text } from 'react-konva'

interface Props {
  createdComposite: CreatedComposite
  handleMove: (e: KonvaEventObject<DragEvent>, isLine?: boolean) => void
  handleEnlarge: (e: KonvaEventObject<Event>, isLine?: boolean) => void
}

const TextView = ({ createdComposite, handleMove, handleEnlarge }: Props) => {
  const [updateLineFlag, setUpdateLineFlag] = useState(false)

  createdComposite.listenForTextChanges(() => {
    setUpdateLineFlag(!updateLineFlag)
  })

  const texts = createdComposite.getText()

  return (
    <>
      {texts.map(el => (
        <Group key={el.id}>
          <Text
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
            zIndex={el.zIndex}
            draggable
          />
        </Group>
      ))}
    </>
  )
}

export default TextView
