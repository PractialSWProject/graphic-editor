import { Stage, Layer } from 'react-konva'
import { Box } from '@mui/material'
import RectView from './ElementView/RectView'
import EllipseView from './ElementView/EllipseView'
import LineView from './ElementView/LineView'
import TextView from './ElementView/TextView'
import ImageView from './ElementView/ImageView'
import ToolBar from './ToolBar'
import PropertyWindow from './PropertyWindow'
import KeyboardState from '../models/state/keyboard'
import LayerWindow from './LayerWindow'
import { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node'
import { DEFAULT_POS } from '../models/base'
import { useRef, useEffect, useState } from 'react'
import Konva from 'konva'
import { Transformer } from 'react-konva'
import { ConcreteImage, ConcreteShape, ConcreteText } from '../models/concrete'
import ElementListSingleton from '../models/singleton'
import { ELLIPSE, RECTANGLE } from '../models/abstract'

const keyboardState = new KeyboardState()

const elementListSingleton = ElementListSingleton.getInstance()

function Editor() {
  const layerRef = useRef<Konva.Layer | null>(null)
  const trRef = useRef<Konva.Transformer | null>(null)

  const [updateShapes, setUpdateShapes] = useState(false)

  elementListSingleton.setElementChangeListener(() => {
    setUpdateShapes(!updateShapes)
  })

  const handleTransformer = () => {
    const layerRefCurrent = layerRef.current

    if (elementListSingleton.getSelected()) {
      if (trRef.current && layerRefCurrent) {
        const selectedIds = elementListSingleton.getSelected().map(el => el.getId())
        const selectedNodes = selectedIds.map(id => layerRefCurrent.findOne('#' + id)) as Node<NodeConfig>[]

        trRef.current.nodes(selectedNodes)
        trRef.current.getLayer()?.batchDraw()
      } else {
        console.log('trRef is not ready')
      }
    }
  }

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    const element = elementListSingleton.getElements().find(el => el.getId() === parseInt(e.target.attrs.id))

    keyboardState.handleClickElement(element)
    handleTransformer()
  }

  const handleMove = (e: KonvaEventObject<DragEvent>, isLine?: boolean) => {
    const element = elementListSingleton.getSelected().find(el => el.getId() === parseInt(e.target.attrs.id))
    const movedX = (element?.getPosition().x || DEFAULT_POS.x) - e.target.getAttr('x')
    const movedY = (element?.getPosition().y || DEFAULT_POS.y) - e.target.getAttr('y')

    if (!element) return
    const newX = isLine ? e.currentTarget.attrs.x + e.currentTarget.attrs.points[0] : element.getPosition().x - movedX
    const newY = isLine ? e.currentTarget.attrs.y + e.currentTarget.attrs.points[1] : element.getPosition().y - movedY

    if (isLine) {
      e.currentTarget.x(0)
      e.currentTarget.y(0)
    }

    elementListSingleton.updatePosition(element.getId(), {
      x: newX,
      y: newY
    })
  }

  const handleEnlarge = (e: KonvaEventObject<Event>, isLine?: boolean) => {
    const element = elementListSingleton.getSelected().find(el => el.getId() === parseInt(e.target.attrs.id))
    if (!element) return

    if (isLine) {
      //line일 때
      e.currentTarget.x(0)
      e.currentTarget.y(0)
    }

    if (isLine === false && element instanceof ConcreteText) {
      //text일 때
      const scale = e.currentTarget.scaleX()
      const newFontSize = element.getFontSize() * scale

      elementListSingleton.updateFontSize(element.getId(), newFontSize)
    } else {
      const scaledX = e.currentTarget.scaleX()
      const scaledY = e.currentTarget.scaleY()

      const newWidth = element.getSize().width * scaledX
      const newHeight = element.getSize().height * scaledY

      elementListSingleton.updateSize(element.getId(), {
        width: newWidth,
        height: newHeight
      })
    }

    e.currentTarget.scaleX(1)
    e.currentTarget.scaleY(1)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      keyboardState.pressShift()
    }
  }

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      keyboardState.releaseShift()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  })

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <Box sx={{ width: '70vw', height: '100vh' }}>
        <ToolBar />
        <Box
          sx={{
            display: 'flex',
            height: '93vh',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'darkgray'
          }}
        >
          <Stage
            width={500}
            height={500}
            style={{ display: 'inline-block', border: '1px solid gray', background: 'white' }}
            onClick={e => handleClick(e)}
          >
            <Layer ref={layerRef}>
              {elementListSingleton.getElements().map((el, idx) => {
                if (el instanceof ConcreteShape) {
                  if (el.getType() === ELLIPSE)
                    return <EllipseView el={el} handleMove={handleMove} handleEnlarge={handleEnlarge} key={idx} />
                  else if (el.getType() === RECTANGLE)
                    return <RectView el={el} handleMove={handleMove} handleEnlarge={handleEnlarge} key={idx} />
                  else return <LineView el={el} handleMove={handleMove} handleEnlarge={handleEnlarge} key={idx} />
                } else if (el instanceof ConcreteText)
                  return <TextView el={el} handleMove={handleMove} handleEnlarge={handleEnlarge} key={idx} />
                else if (el instanceof ConcreteImage)
                  return <ImageView el={el} handleMove={handleMove} handleEnlarge={handleEnlarge} key={idx} />
                else return null
              })}
              <Transformer
                ref={trRef}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox
                  }
                  return newBox
                }}
              />
            </Layer>
          </Stage>
        </Box>
      </Box>
      <Box sx={{ width: '30vw', height: '100vh' }}>
        <Box sx={{ height: '50vh', backgroundColor: '#434343' }}>
          <PropertyWindow />
        </Box>
        <Box sx={{ height: '50vh' }}>
          <LayerWindow layerRef={layerRef} />
        </Box>
      </Box>
    </Box>
  )
}

export default Editor
