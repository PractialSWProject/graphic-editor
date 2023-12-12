import { useState, useRef } from 'react'
import styled from 'styled-components'
import outlinedEllipse from '../../assets/outlined_ellipse.svg'
import outlinedRectangle from '../../assets/outlined_rectangle.svg'
import text from '../../assets/text.svg'
import image from '../../assets/image.svg'
import line from '../../assets/line.svg'
import Button from './Button'
import TextInput from './TextInput'
import ElementListSingleton from '../../models/handler'
import { ConcreteFactory } from '../../models/factory'
import { ELLIPSE, LINE, RECTANGLE } from '../../models/elementAbstract'

let ID = 1

const factory = new ConcreteFactory()
const elementListSingleton = ElementListSingleton.getInstance()

function ToolBar() {
  const [input, setInput] = useState<string>('')
  const [textInputOpen, setTextInputOpen] = useState<boolean>(false)
  const imgInputRef = useRef<HTMLInputElement>(null)

  const createEllipse = () => {
    const ellipse = factory.createShape(ID++, ELLIPSE)
    elementListSingleton.addElement(ellipse)
  }

  const createRectangle = () => {
    const rect = factory.createShape(ID++, RECTANGLE)
    elementListSingleton.addElement(rect)
  }

  const createLine = () => {
    const line = factory.createShape(ID++, LINE)
    elementListSingleton.addElement(line)
  }

  const createText = () => {
    const text = factory.createText(ID++, input)
    elementListSingleton.addElement(text)
  }

  const onLoadImg = (e: any) => {
    const currentfiles = e.target.files

    const img = new Image()
    img.src = URL.createObjectURL(currentfiles[0])
    img.onload = () => {
      const image = factory.createImage(ID++, img.src, { width: 150, height: 150 * (img.height / img.width) })
      elementListSingleton.addElement(image)
    }
  }

  return (
    <ToolBarWrapper>
      <Button icon={outlinedEllipse} onClick={createEllipse} />
      <Divider />
      <Button icon={outlinedRectangle} onClick={createRectangle} />
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
      {textInputOpen && (
        <TextInput input={input} setInput={setInput} createText={createText} close={() => setTextInputOpen(false)} />
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
  height: 7vh;
  background-color: #434343;
`

const Divider = styled.div`
  width: 0.5px;
  height: 35px;
  background-color: #ffffff;
`
