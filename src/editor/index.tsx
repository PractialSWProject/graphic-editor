import { Stage, Layer } from 'react-konva'
import { Box } from '@mui/material'
import RectView from './ElementView/RectView'
import EllipseView from './ElementView/EllipseView'
import LineView from './ElementView/LineView'
import ToolBar from './ToolBar'
import PropertyWindow from './PropertyWindow'
import CreatedComposite from '../models/composite/created'
import LayerWindow from './LayerWindow'

const createdComposite = new CreatedComposite()

function Editor() {
  const handleClickElseWhere = () => {}

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
          >
            <Layer>
              <RectView createdComposite={createdComposite} />
              <EllipseView createdComposite={createdComposite} />
              <LineView createdComposite={createdComposite} />
            </Layer>
          </Stage>
        </Box>
      </Box>
      <Box sx={{ width: '30vw', height: '100vh' }}>
        <Box sx={{ height: '50vh' }}>
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
