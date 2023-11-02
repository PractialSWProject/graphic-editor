import styled from 'styled-components'
import outlinedEllipse from '../../assets/outlined_ellipse.svg'
import outlinedRectangle from '../../assets/outlined_rectangle.svg'
import line from '../../assets/line.svg'
import Button from './Button'
import CreatedComposite from '../../models/composite/created'
import ElementFactory from '../../models/Elements/Factories/ElementFactory'
interface ToolBarProps {
  createdComposite: CreatedComposite
}

let ID = 1
const elementFactory = new ElementFactory()

function ToolBar({ createdComposite }: ToolBarProps) {
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

  return (
    <ToolBarWrapper>
      <Button icon={outlinedEllipse} onClick={createEllipse} />
      <Divider />
      <Button icon={outlinedRectangle} onClick={createRectangle} />
      <Divider />
      <Button icon={line} onClick={createLine} />
      <Divider />
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
