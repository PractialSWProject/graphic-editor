import { Stage, Layer } from 'react-konva'
import { Box } from '@mui/material'
import RectView from './ElementView/RectView'
import EllipseView from './ElementView/EllipseView'
import LineView from './ElementView/LineView'
import ToolBar from './ToolBar'
import PropertyWindow from './PropertyWindow'
import CreatedComposite from '../models/composite/created'
import LayerWindow from './LayerWindow'
import { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node'
import { DEFAULT_POS } from '../models/base'
import { useRef } from 'react'
import Konva from 'konva'
import { Transformer } from 'react-konva'

export type KonvaComponentT = Konva.Ellipse | Konva.Rect | Konva.Line | null

const createdComposite = new CreatedComposite()

function Editor() {
  const layerRef = useRef<Konva.Layer | null>(null)
  const trRef = useRef<Konva.Transformer | null>(null)

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

    if (e.evt.shiftKey) {
      if (element) {
        if (createdComposite.isInSelectionManager(element)) {
          createdComposite.deselect(element)
        } else {
          createdComposite.select(element)
        }
      }
    } else {
      if (element) {
        createdComposite.deselectAll()
        createdComposite.select(element)
      } else {
        createdComposite.deselectAll()
      }
    }
    handleTransformer()
  }

  const handleMove = (e: KonvaEventObject<DragEvent>, isLine?: boolean) => {
    const element = createdComposite.getSelected().find(el => el.id === parseInt(e.target.attrs.id))
    const movedX = (element?.properties.position.x || DEFAULT_POS.x) - e.target.getAttr('x')
    const movedY = (element?.properties.position.y || DEFAULT_POS.y) - e.target.getAttr('y')

    if (!element) return
    const newX = isLine
      ? e.currentTarget.attrs.x + e.currentTarget.attrs.points[0]
      : element.properties.position.x - movedX
    const newY = isLine
      ? e.currentTarget.attrs.y + e.currentTarget.attrs.points[1]
      : element.properties.position.y - movedY

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
      e.currentTarget.x(0)
      e.currentTarget.y(0)
    }

    const scaledX = e.currentTarget.scaleX()
    const scaledY = e.currentTarget.scaleY()

    const newWidth = element.properties.size.width * scaledX
    const newHeight = element.properties.size.height * scaledY

    createdComposite.updateSize(element.id, { width: newWidth, height: newHeight })

    e.currentTarget.scaleX(1)
    e.currentTarget.scaleY(1)
  }

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
              <RectView createdComposite={createdComposite} handleMove={handleMove} handleEnlarge={handleEnlarge} />
              <EllipseView createdComposite={createdComposite} handleMove={handleMove} handleEnlarge={handleEnlarge} />
              <LineView createdComposite={createdComposite} handleMove={handleMove} handleEnlarge={handleEnlarge} />
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
          <LayerWindow createdComposite={createdComposite} />
        </Box>
      </Box>
    </Box>
  )
}

export default Editor
