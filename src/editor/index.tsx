import { useEffect, useState, useMemo } from 'react'
import { FilledShapeConcreteFactory, OutlinedShapeConcreteFactory } from '../models/shapes/variants'
import { TextConcreteFactory } from '../models/text'
import { Stage, Layer } from 'react-konva'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { ShapeElementT, TextElementT, VariantT } from './type'
import { DEFAULT_POS, DEFAULT_SIZE, DEFAULT_COLOR, DEFAULT_CONTENT, DEFAULT_FONTSIZE } from './constants'
import RectView from './ElementView/RectView'
import EllipseView from './ElementView/EllipseView'
import TextView from './ElementView/TextView'

let ZINDEX = 0
let ID = 1

const filledShapeFactory = new FilledShapeConcreteFactory()
const outlinedShapeFactory = new OutlinedShapeConcreteFactory()
const textFactory = new TextConcreteFactory()

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

  const createRectangle = (variant: VariantT) => {
    const newRect = {
      id: ID++,
      variant,
      shape:
        variant === 'filled'
          ? filledShapeFactory.createRectangle({
              position: { ...DEFAULT_POS },
              size: { ...DEFAULT_SIZE },
              color: DEFAULT_COLOR,
              zIndex: ZINDEX++
            })
          : outlinedShapeFactory.createRectangle({
              position: { ...DEFAULT_POS },
              size: { ...DEFAULT_SIZE },
              color: DEFAULT_COLOR,
              zIndex: ZINDEX++
            })
    }

    setRects([...rects, newRect])
  }

  const createEllipse = (variant: VariantT) => {
    const newEllipse = {
      id: ID++,
      variant,
      shape:
        variant === 'filled'
          ? filledShapeFactory.createEllipse({
              position: { ...DEFAULT_POS },
              size: { ...DEFAULT_SIZE },
              color: DEFAULT_COLOR,
              zIndex: ZINDEX++
            })
          : outlinedShapeFactory.createEllipse({
              position: { ...DEFAULT_POS },
              size: { ...DEFAULT_SIZE },
              color: DEFAULT_COLOR,
              zIndex: ZINDEX++
            })
    }

    setEllipses([...ellipses, newEllipse])
  }

  const createText = () => {
    const newText = {
      id: ID++,
      text: textFactory.createText({
        position: { ...DEFAULT_POS },
        size: { ...DEFAULT_SIZE },
        content: DEFAULT_CONTENT,
        textColor: DEFAULT_COLOR,
        fontSize: DEFAULT_FONTSIZE,
        zIndex: ZINDEX++
      })
    }

    setTexts([...texts, newText])
  }

  useEffect(() => {
    let recElement1 = {
      id: ID++,
      variant: 'filled' as VariantT,
      shape: filledShapeFactory.createRectangle({
        position: { x: 50, y: 50 },
        size: { width: 100, height: 100 },
        color: 'blue',
        zIndex: ZINDEX++
      })
    }
    let recElement2 = {
      id: ID++,
      variant: 'filled' as VariantT,
      shape: filledShapeFactory.createRectangle({
        position: { x: 200, y: 200 },
        size: { width: 100, height: 100 },
        color: 'red',
        zIndex: ZINDEX++
      })
    }
    setRects([recElement1, recElement2])
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <Stage
        width={window.innerWidth * 0.7}
        height={window.innerHeight}
        style={{ display: 'inline-block', border: '1px solid gray' }}
      >
        <Layer>
          <RectView rects={rects} setRects={setRects} />
          <EllipseView ellipses={ellipses} setEllipses={setEllipses} />
          <TextView texts={texts} setTexts={setTexts} />
        </Layer>
      </Stage>
      <div>
        <DataGrid rows={rows} columns={columns} pagination />
        <Button style={{ display: 'block' }} onClick={() => createRectangle('filled')}>
          Create new filled Rectangle
        </Button>
        <Button style={{ display: 'block' }} onClick={() => createRectangle('outlined')}>
          Create new outlined Rectangle
        </Button>
        <Button style={{ display: 'block' }} onClick={() => createEllipse('filled')}>
          Create new filled Ellipse
        </Button>
        <Button style={{ display: 'block' }} onClick={() => createEllipse('outlined')}>
          Create new outlined Ellipse
        </Button>
        <Button style={{ display: 'block' }} onClick={() => createText()}>
          Create new Text
        </Button>
      </div>
    </div>
  )
}

export default Editor
