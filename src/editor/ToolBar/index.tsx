import { FilledShapeConcreteFactory, OutlinedShapeConcreteFactory } from '../../models/shapes/variants'
import { TextConcreteFactory } from '../../models/text'
import { Box, Button } from '@mui/material'
import { ShapeElementT, TextElementT, VariantT } from '../type'
import { DEFAULT_POS, DEFAULT_SIZE, DEFAULT_COLOR, DEFAULT_CONTENT, DEFAULT_FONTSIZE } from '../constants'

let ZINDEX = 0
let ID = 1

const filledShapeFactory = new FilledShapeConcreteFactory()
const outlinedShapeFactory = new OutlinedShapeConcreteFactory()
const textFactory = new TextConcreteFactory()

interface ToolBarProps {
  rects: ShapeElementT[]
  ellipses: ShapeElementT[]
  texts: TextElementT[]
  setRects: (newRect: ShapeElementT) => void
  setEllipses: (newEllipse: ShapeElementT) => void
  setTexts: (newText: TextElementT) => void
}

function ToolBar({ rects, ellipses, texts, setRects, setEllipses, setTexts }: ToolBarProps) {
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

    setRects(newRect)
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

    setEllipses(newEllipse)
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

    setTexts(newText)
  }

  return (
    <Box sx={{ display: 'flex', height: '10vh' }}>
      <Button style={{ display: 'block' }} onClick={() => createRectangle('filled')}>
        filled Rectangle
      </Button>
      <Button style={{ display: 'block' }} onClick={() => createRectangle('outlined')}>
        outlined Rectangle
      </Button>
      <Button style={{ display: 'block' }} onClick={() => createEllipse('filled')}>
        filled Ellipse
      </Button>
      <Button style={{ display: 'block' }} onClick={() => createEllipse('outlined')}>
        outlined Ellipse
      </Button>
      <Button style={{ display: 'block' }} onClick={() => createText()}>
        Text
      </Button>
    </Box>
  )
}

export default ToolBar
