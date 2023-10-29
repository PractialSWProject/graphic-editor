import { useState, useRef } from 'react'
import styled from 'styled-components'
import outlinedEllipse from '../../assets/outlined_ellipse.svg'
import filledEllipse from '../../assets/filled_ellipse.svg'
import outlinedRectangle from '../../assets/outlined_rectangle.svg'
import filledRectangle from '../../assets/filled_rectangle.svg'
import line from '../../assets/line.svg'
import text from '../../assets/text.svg'
import image from '../../assets/image.svg'
import { FilledShapeConcreteFactory, OutlinedShapeConcreteFactory } from '../../models/shapes/variants'
import { TextConcreteFactory } from '../../models/text'
import { ImageConcreteFactory } from '../../models/image'
import { ImageElementT, ShapeElementT, TextElementT, VariantT } from '../type'
import { DEFAULT_POS, DEFAULT_SIZE, DEFAULT_COLOR, DEFAULT_FONTSIZE } from '../constants'
import OptionWindow from './OptionWindow'
import Button from './Button'
import TextInput from './TextInput'

let ZINDEX = 0
let ID = 1

const filledShapeFactory = new FilledShapeConcreteFactory()
const outlinedShapeFactory = new OutlinedShapeConcreteFactory()
const textFactory = new TextConcreteFactory()
const imageFactory = new ImageConcreteFactory()

interface ToolBarProps {
  setRects: (newRect: ShapeElementT) => void
  setEllipses: (newEllipse: ShapeElementT) => void
  setLines: (newLine: ShapeElementT) => void
  setTexts: (newText: TextElementT) => void
  setImages: (newImage: ImageElementT) => void
}

function ToolBar({ setRects, setEllipses, setLines, setTexts, setImages }: ToolBarProps) {
  const [rectOptionOpen, setRectOptionOpen] = useState(false)
  const [ellipseOptionOpen, setEllipseOptionOpen] = useState(false)
  const [textInputOpen, setTextInputOpen] = useState(false)
  const [textInput, setTextInput] = useState('')
  const imgInputRef = useRef<HTMLInputElement>(null)

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

  const createLine = () => {
    const newLine = {
      id: ID++,
      variant: 'outlined' as VariantT,
      shape: outlinedShapeFactory.createLine({
        position: { ...DEFAULT_POS },
        size: { ...DEFAULT_SIZE },
        color: DEFAULT_COLOR,
        zIndex: ZINDEX++
      })
    }

    setLines(newLine)
  }

  const createText = () => {
    const newText = {
      id: ID++,
      text: textFactory.createText({
        position: { ...DEFAULT_POS },
        size: { ...DEFAULT_SIZE },
        content: textInput,
        textColor: DEFAULT_COLOR,
        fontSize: DEFAULT_FONTSIZE,
        zIndex: ZINDEX++
      })
    }

    setTexts(newText)
    setTextInput('')
  }

  const onLoadImg = (e: any) => {
    const currentfiles = e.target.files

    if (currentfiles.length() === 0) {
      return
    }

    const img = new Image()
    img.src = URL.createObjectURL(currentfiles[0])
    img.onload = () => {
      const newImg = {
        id: ID++,
        img: imageFactory.createImage({
          position: { ...DEFAULT_POS },
          size: { width: 150, height: 150 * (img.height / img.width) },
          imageUrl: img.src,
          zIndex: ZINDEX++
        })
      }

      setImages(newImg)
    }
  }

  return (
    <ToolBarWrapper>
      <Button icon={outlinedEllipse} onClick={() => setEllipseOptionOpen(true)} />
      <Divider />
      <Button icon={outlinedRectangle} onClick={() => setRectOptionOpen(true)} />
      <Divider />
      <Button icon={line} onClick={createLine} />
      <Divider />
      <Button icon={text} onClick={() => setTextInputOpen(true)} />
      <Divider />
      <Button icon={image} onClick={() => imgInputRef.current && imgInputRef.current.click()}>
        <input
          ref={imgInputRef}
          type="file"
          id="image"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onLoadImg}
        />
      </Button>
      {ellipseOptionOpen && (
        <OptionWindow
          left={10}
          outlinedImg={outlinedEllipse}
          filledImg={filledEllipse}
          createElement={createEllipse}
          closeWindow={() => setEllipseOptionOpen(false)}
        />
      )}
      {rectOptionOpen && (
        <OptionWindow
          left={60}
          outlinedImg={outlinedRectangle}
          filledImg={filledRectangle}
          createElement={createRectangle}
          closeWindow={() => setRectOptionOpen(false)}
        />
      )}
      {textInputOpen && (
        <TextInput
          input={textInput}
          setInput={setTextInput}
          createText={createText}
          close={() => setTextInputOpen(false)}
        />
      )}
    </ToolBarWrapper>
  )
}

export default ToolBar

const ToolBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #434343;
`

const Divider = styled.div`
  width: 0.5px;
  height: 35px;
  background-color: #ffffff;
`
