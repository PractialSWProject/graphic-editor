import { Stage, Layer } from 'react-konva'
import { Box } from '@mui/material'
import RectView from './ElementView/RectView'
import EllipseView from './ElementView/EllipseView'
import LineView from './ElementView/LineView'
import ToolBar from './ToolBar'
import PropertyWindow from './PropertyWindow'
import CreatedComposite from '../models/composite/created'
import LayerWindow from './LayerWindow'
import { KonvaEventObject } from 'konva/lib/Node'
import { DEFAULT_POS } from '../models/base'

const createdComposite = new CreatedComposite()

function Editor() {
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
  }

  const handleMove = (e: KonvaEventObject<DragEvent>) => {
    const element = createdComposite.getSelected().find(el => el.id === parseInt(e.target.attrs.id))
    const movedX = (element?.properties.position.x || DEFAULT_POS.x) - e.target.getAttr('x')
    const movedY = (element?.properties.position.y || DEFAULT_POS.y) - e.target.getAttr('y')

    createdComposite.getSelected().forEach(el => {
      const newX = el.properties.position.x - movedX
      const newY = el.properties.position.y - movedY

      createdComposite.updatePosition(el.id, { x: newX, y: newY })
    })
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
            <Layer>
              <RectView createdComposite={createdComposite} handleMove={handleMove} />
              <EllipseView createdComposite={createdComposite} handleMove={handleMove} />
              <LineView createdComposite={createdComposite} handleMove={handleMove} />
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
