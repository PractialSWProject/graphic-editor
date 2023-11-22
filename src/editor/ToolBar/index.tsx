import { useState, useRef } from 'react'
import styled from 'styled-components'
import outlinedEllipse from '../../assets/outlined_ellipse.svg'
import outlinedRectangle from '../../assets/outlined_rectangle.svg'
import text from '../../assets/text.svg'
import image from '../../assets/image.svg'
import line from '../../assets/line.svg'
import Button from './Button'
import CreatedComposite from '../../models/composite/created'
import ElementFactory from '../../models/Elements/Factories/ElementFactory'
import TextInput from './TextInput'

interface ToolBarProps {
  createdComposite: CreatedComposite
}

let ID = 1
const elementFactory = new ElementFactory()

function ToolBar({ createdComposite }: ToolBarProps) {
  const [input, setInput] = useState<string>('')
  const [textInputOpen, setTextInputOpen] = useState<boolean>(false)
  const imgInputRef = useRef<HTMLInputElement>(null)

  const createEllipse = () => {
    const ellipse = elementFactory.createEllipse(ID++)
    createdComposite.create(ellipse)
  }

  const createRectangle = () => {
    const rectangle = elementFactory.createRectangle(ID++)
    createdComposite.create(rectangle)
  }

  const createLine = () => {
    const line = elementFactory.createLine(ID++)
    createdComposite.create(line)
  }

  const createText = () => {
    const text = elementFactory.createText(ID++)
    text.content = input
    createdComposite.create(text)
  }

  const onLoadImg = (e: any) => {
    const currentfiles = e.target.files

    const img = new Image()
    img.src = URL.createObjectURL(currentfiles[0])
    img.onload = () => {
      const image = elementFactory.createImage(ID++)
      image.url = img.src
      image.size = { width: 150, height: 150 * (img.height / img.width) }
      createdComposite.create(image)
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
  height: 50px;
  background-color: #434343;
`

const Divider = styled.div`
  width: 0.5px;
  height: 35px;
  background-color: #ffffff;
`
