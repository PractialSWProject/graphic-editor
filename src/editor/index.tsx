import { useState, useMemo } from 'react'
import { Stage, Layer } from 'react-konva'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { ShapeElementT, TextElementT } from './type'
import RectView from './ElementView/RectView'
import EllipseView from './ElementView/EllipseView'
import TextView from './ElementView/TextView'
import ToolBar from './ToolBar'
import PropertyWindow from './PropertyWindow'

function Editor() {
  const [rects, setRects] = useState<ShapeElementT[]>([])
  const [ellipses, setEllipses] = useState<ShapeElementT[]>([])
  const [texts, setTexts] = useState<TextElementT[]>([])

  const rows = useMemo(() => {
    const rectRows = rects.map(el => {
      return {
        id: el.id,
        type: el.variant + ' rect',
        x: Math.floor(el.shape.getPosition().x),
        y: Math.floor(el.shape.getPosition().y),
        color: el.shape.getColor()
      }
    })
    const ellipseRows = ellipses.map(el => {
      return {
        id: el.id,
        type: el.variant + ' ellipse',
        x: Math.floor(el.shape.getPosition().x),
        y: Math.floor(el.shape.getPosition().y),
        color: el.shape.getColor()
      }
    })
    const textRows = texts.map(el => {
      return {
        id: el.id,
        type: 'text',
        x: Math.floor(el.text.getPosition().x),
        y: Math.floor(el.text.getPosition().y),
        color: el.text.getTextColor()
      }
    })
    return rectRows.concat(ellipseRows).concat(textRows)
  }, [rects, ellipses, texts])

  const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'type', headerType: 'TYPE', width: 120 },
    {
      field: 'x',
      headerName: 'X',
      width: 70
    },
    {
      field: 'y',
      headerName: 'Y',
      width: 70
    },
    {
      field: 'color',
      headerName: 'COLOR',
      width: 100
    }
  ]

  const handleUpdateRect = (newRect: ShapeElementT) => {
    setRects([...rects, newRect])
  }

  const handleUpdateEllipse = (newEllipse: ShapeElementT) => {
    setEllipses([...ellipses, newEllipse])
  }

  const handleUpdateText = (newText: TextElementT) => {
    setTexts([...texts, newText])
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <Box sx={{ width: '70vw', height: '100vh' }}>
        <ToolBar
          rects={rects}
          ellipses={ellipses}
          texts={texts}
          setRects={handleUpdateRect}
          setEllipses={handleUpdateEllipse}
          setTexts={handleUpdateText}
        />
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
              <RectView rects={rects} setRects={setRects} />
              <EllipseView ellipses={ellipses} setEllipses={setEllipses} />
              <TextView texts={texts} setTexts={setTexts} />
            </Layer>
          </Stage>
        </Box>
      </Box>
      <Box sx={{ width: '30vw', height: '100vh' }}>
        <Box sx={{ height: '50vh' }}>
          <PropertyWindow />
        </Box>
        <Box sx={{ height: '50vh' }}>
          <DataGrid rows={rows} columns={columns} pagination />
        </Box>
      </Box>
    </Box>
  )
}

export default Editor
