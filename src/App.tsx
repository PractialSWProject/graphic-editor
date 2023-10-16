import { useState } from 'react'
import { FilledShapeConcreteFactory, OutlinedShapeConcreteFactory } from './models/shapes/variants'
import { Box, Button, Divider } from '@mui/material'

const outlinedShapeFactory = new OutlinedShapeConcreteFactory()
const filledShapeFactory = new FilledShapeConcreteFactory()

function App() {
  const [colorFilled, setColorFilled] = useState('')
  const [colorOutlined, setColorOutlined] = useState('')
  const outlinedRectangle = outlinedShapeFactory.createRectangle({
    position: { x: 50, y: 60 },
    size: { width: 120, height: 80 },
    zIndex: 3,
    color: colorOutlined
  })

  const filledRectangle = filledShapeFactory.createRectangle({
    position: { x: 50, y: 60 },
    size: { width: 120, height: 80 },
    zIndex: 3,
    color: colorFilled
  })
  return (
    <div className="App">
      <h1>Graphic Editor</h1>
      <h4>간단한 사용예시!</h4>

      <Box>
        <div>
          <p>{`Filled Rectangle Color: ${outlinedRectangle.getColor()}`}</p>
        </div>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              setColorOutlined('red')
            }}
          >
            Red Rectangle
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setColorOutlined('blue')
            }}
          >
            Blue Rectangle
          </Button>
        </Box>
        <Box>
          <Box
            style={{
              width: outlinedRectangle.getSize().width,
              height: outlinedRectangle.getSize().height,
              backgroundColor: outlinedRectangle.getColor()
            }}
          />
        </Box>
      </Box>
      <Divider style={{ margin: 10 }} />
      <Box>
        <div>
          <p>{`Outlined Rectangle Color: ${filledRectangle.getColor()}`}</p>
        </div>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              setColorFilled('red')
            }}
          >
            Red Rectangle
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setColorFilled('blue')
            }}
          >
            Blue Rectangle
          </Button>
        </Box>
        <Box>
          <Box
            style={{
              width: filledRectangle.getSize().width,
              height: filledRectangle.getSize().height,
              border: 'solid',
              borderWidth: 10,
              borderColor: filledRectangle.getColor()
            }}
          />
        </Box>
      </Box>

      <p>이렇게..?</p>
    </div>
  )
}

export default App
