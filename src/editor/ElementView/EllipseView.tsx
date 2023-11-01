import { useState } from 'react'
import { Ellipse } from 'react-konva'
import CreatedComposite from '../../models/composite/created'
import Rectangle from '../../models/Elements/Shapes/rectangle'

interface Props {
  createdComposite: CreatedComposite
}

const EllipseView = ({ createdComposite }: Props) => {
  const [updateFlag, setUpdateFlag] = useState(false)

  createdComposite.listenForEllipseChanges(() => {
    setUpdateFlag(!updateFlag)
  })

  const ellipses = createdComposite.getEllipse()

  const move = (id: number, x: number, y: number) => {
    createdComposite.updatePosition(id, { x, y })
  }

  const handleClick = (el: Rectangle) => {
    if (createdComposite.isInSelectionManager(el)) {
      createdComposite.deselect(el)
    } else {
      createdComposite.select(el)
    }
  }
  return (
    <>
      {ellipses.map(el => (
        <Ellipse
          key={el.id}
          x={el.properties.position.x}
          y={el.properties.position.y}
          width={el.properties.size.width}
          height={el.properties.size.height}
          radiusX={el.properties.size.width / 2}
          radiusY={el.properties.size.height / 2}
          fill={el.properties.color}
          shadowBlur={10}
          shadowColor='lime'
          shadowEnabled={el.selected ? true : false}
          onDragEnd={e => {
            move(el.id, e.target.x(), e.target.y())
          }}
          onMouseDown={() => {
            handleClick(el)
          }}
          draggable
        />
      ))}
    </>
  )
}

export default EllipseView
