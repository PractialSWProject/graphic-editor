import { Stage, Layer } from 'react-konva'
import { Box } from '@mui/material'
import RectView from './ElementView/RectView'
import EllipseView from './ElementView/EllipseView'
import LineView from './ElementView/LineView'
import TextView from './ElementView/TextView'
import ImageView from './ElementView/ImageView'
import ToolBar from './ToolBar'
import PropertyWindow from './PropertyWindow'
import CreatedComposite from '../models/composite/created'
import KeyboardState from '../models/state/keyboard'
import LayerWindow from './LayerWindow'
import { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node'
import { DEFAULT_POS } from '../models/base'
import { useRef, useEffect, useState } from 'react'
import Konva from 'konva'
import { Transformer } from 'react-konva'
import Text from '../models/Elements/Text'
import Ellipse from '../models/Elements/Shapes/ellipse'
import Line from '../models/Elements/Shapes/line'
import Rectangle from '../models/Elements/Shapes/rectangle'
import Image from '../models/Elements/Image'
// export type KonvaComponentT = Konva.Ellipse | Konva.Rect | Konva.Line | null

export const createdComposite = new CreatedComposite()
const keyboardState = new KeyboardState()

function Editor() {
  const layerRef = useRef<Konva.Layer | null>(null)
  const trRef = useRef<Konva.Transformer | null>(null)

  const [updateShapes, setUpdateShapes] = useState(false)

  createdComposite.listenForElementChanges(() => {
    setUpdateShapes(!updateShapes)
  })

  const handleTransformer = () => {
    const layerRefCurrent = layerRef.current

    if (createdComposite.getSelected()) {
      if (trRef.current && layerRefCurrent) {
        const selectedIds = createdComposite.getSelected().map(el => el.id)
        const selectedNodes = selectedIds.map(id => layerRefCurrent.findOne('#' + id)) as Node<NodeConfig>[]

        trRef.current.nodes(selectedNodes)
        trRef.current.getLayer()?.batchDraw()
      } else {
        console.log('trRef is not ready')
      }
    }
  }

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    const element = createdComposite.get().find(el => el.id === parseInt(e.target.attrs.id))

    keyboardState.handleClickElement(element)
    handleTransformer()
  }

  const handleMove = (e: KonvaEventObject<DragEvent>, isLine?: boolean) => {
    const element = createdComposite.getSelected().find(el => el.id === parseInt(e.target.attrs.id))
    const movedX = (element?.position.x || DEFAULT_POS.x) - e.target.getAttr('x')
    const movedY = (element?.position.y || DEFAULT_POS.y) - e.target.getAttr('y')

    if (!element) return
    const newX = isLine ? e.currentTarget.attrs.x + e.currentTarget.attrs.points[0] : element.position.x - movedX
    const newY = isLine ? e.currentTarget.attrs.y + e.currentTarget.attrs.points[1] : element.position.y - movedY

    if (isLine) {
      e.currentTarget.x(0)
      e.currentTarget.y(0)
    }

    createdComposite.updatePosition(element.id, {
      x: newX,
      y: newY
    })
  }

  const handleEnlarge = (e: KonvaEventObject<Event>, isLine?: boolean) => {
    const element = createdComposite.getSelected().find(el => el.id === parseInt(e.target.attrs.id))
    if (!element) return

    if (isLine) {
      //line일 때
      e.currentTarget.x(0)
      e.currentTarget.y(0)
    }

    if (isLine === false && element instanceof Text) {
      //text일 때
      const scale = e.currentTarget.scaleX()
      const newFontSize = element.fontSize * scale

      createdComposite.updateFontSize(element.id, newFontSize)
    } else {
      const scaledX = e.currentTarget.scaleX()
      const scaledY = e.currentTarget.scaleY()

      const newWidth = element.size.width * scaledX
      const newHeight = element.size.height * scaledY

      createdComposite.updateSize(element.id, { width: newWidth, height: newHeight })
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
        <ToolBar createdComposite={createdComposite} />
        <Box
          sx={{
            display: 'flex',
            height: '90vh',
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
              {createdComposite.get().map((el, idx) => {
                if (el instanceof Ellipse)
                  return <EllipseView el={el} handleMove={handleMove} handleEnlarge={handleEnlarge} key={idx} />
                else if (el instanceof Rectangle)
                  return <RectView el={el} handleMove={handleMove} handleEnlarge={handleEnlarge} key={idx} />
                else if (el instanceof Line)
                  return <LineView el={el} handleMove={handleMove} handleEnlarge={handleEnlarge} key={idx} />
                else if (el instanceof Text)
                  return <TextView el={el} handleMove={handleMove} handleEnlarge={handleEnlarge} key={idx} />
                else if (el instanceof Image)
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
          <PropertyWindow createdComposite={createdComposite} />
        </Box>
        <Box sx={{ height: '50vh' }}>
          <LayerWindow
            createdComposite={createdComposite}
            layerRef={layerRef}
            elementListener={() => {
              createdComposite.listenForElementChanges(() => {
                setUpdateShapes(!updateShapes)
              })
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Editor
