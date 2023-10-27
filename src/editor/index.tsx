import { useState, useMemo } from 'react'
import { Stage, Layer } from 'react-konva'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { ShapeElementT, TextElementT, ImageElementT } from './type'
import RectView from './ElementView/RectView'
import EllipseView from './ElementView/EllipseView'
import TextView from './ElementView/TextView'
import LineView from './ElementView/LineView'
import ImageView from './ElementView/ImageView'
import ToolBar from './ToolBar'
import PropertyWindow from './PropertyWindow'

function Editor() {
  const [rects, setRects] = useState<ShapeElementT[]>([])
  const [ellipses, setEllipses] = useState<ShapeElementT[]>([])
  const [lines, setLines] = useState<ShapeElementT[]>([])
  const [texts, setTexts] = useState<TextElementT[]>([])
  const [images, setImages] = useState<ImageElementT[]>([])

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

    const lineRows = lines.map(el => {
      return {
        id: el.id,
        type: 'lines',
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

    const imageRows = images.map(el => {
      return {
        id: el.id,
        type: 'image',
        x: Math.floor(el.img.getPosition().x),
        y: Math.floor(el.img.getPosition().y),
        color: ''
      }
    })
    return rectRows.concat(ellipseRows).concat(lineRows).concat(textRows).concat(imageRows)
  }, [rects, ellipses, lines, texts, images])

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

  const handleUpdateLine = (newLine: ShapeElementT) => {
    setLines([...lines, newLine])
  }

  const handleUpdateText = (newText: TextElementT) => {
    setTexts([...texts, newText])
  }

  const handleUpdateImage = (newImage: ImageElementT) => {
    setImages([...images, newImage])
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <Box sx={{ width: '70vw', height: '100vh' }}>
        <ToolBar
          setRects={handleUpdateRect}
          setEllipses={handleUpdateEllipse}
          setLines={handleUpdateLine}
          setTexts={handleUpdateText}
          setImages={handleUpdateImage}
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
              <LineView lines={lines} setLines={setLines} />
              <ImageView images={images} setImages={setImages} />
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
