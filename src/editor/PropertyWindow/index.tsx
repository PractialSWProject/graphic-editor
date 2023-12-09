import { Box, Dialog, Divider, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
// import Text from '../../models/Elements/Text'
import ElementListSingleton from '../../models/singleton'
import { ConcreteShape, ConcreteText } from '../../models/concrete'

const elementListSingleton = ElementListSingleton.getInstance()

function PropertyWindow() {
  const [isOpenPalette, setIsOpenPalette] = useState(false)
  const [updateProperty, setUpdateProperty] = useState(false)

  elementListSingleton.setPropertyWindowListener(() => {
    setUpdateProperty(!updateProperty)
  })

  const selected = elementListSingleton.getSelected()

  const handleOpenPalette = () => {
    if (selected.length > 1) return
    setIsOpenPalette(isOpenPalette => !isOpenPalette)
  }

  const handleChangeColor = (color: { hex: string }) => {
    elementListSingleton.updateColor(selected[0].getId(), color.hex)
  }

  const handleChangePosition = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, xy: string) => {
    const newXY = parseFloat(e.target.value)
    if (!isNaN(newXY)) {
      const currentPosition = selected[0].getPosition()
      const newPosition = xy === 'x' ? { ...currentPosition, x: newXY } : { ...currentPosition, y: newXY }
      elementListSingleton.updatePosition(selected[0].getId(), newPosition)
    }
  }

  const handleChangeSize = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, wh: string) => {
    const newWH = parseFloat(e.target.value)
    if (!isNaN(newWH)) {
      const currentSize = selected[0].getSize()
      const newSize = wh === 'height' ? { ...currentSize, height: newWH } : { ...currentSize, width: newWH }
      elementListSingleton.updateSize(selected[0].getId(), newSize)
    }
  }

  return (
    <Box height={'50vh'}>
      <Box style={{ height: '7vh', backgroundColor: '#434343' }} display={'flex'} alignItems={'center'}>
        <Typography variant="subtitle1" sx={{ color: '#C7C7C7', padding: 2 }}>
          속성창
        </Typography>
      </Box>
      <Divider sx={{ borderColor: '#333' }} />
      <Box style={{ backgroundColor: '#434343', display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Box display={'flex'} alignItems={'center'} padding={2}>
              <Typography variant="subtitle1" marginRight={2} color={'#C7C7C7'}>
                X:
              </Typography>
              <TextField
                size="small"
                disabled={selected.length !== 1}
                margin="dense"
                inputProps={{ style: { color: 'white' } }}
                type="number"
                onChange={e => handleChangePosition(e, 'x')}
                value={selected.length === 1 && Math.floor(selected[0].getPosition().x)}
                sx={{ backgroundColor: selected.length > 1 ? '#565656' : undefined }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box display={'flex'} alignItems={'center'} padding={2}>
              <Typography variant="subtitle1" marginRight={2} color={'#C7C7C7'}>
                Y:
              </Typography>
              <TextField
                size="small"
                disabled={selected.length !== 1}
                margin="dense"
                inputProps={{ style: { color: 'white' } }}
                type="number"
                onChange={e => handleChangePosition(e, 'y')}
                value={selected.length === 1 && Math.floor(selected[0].getPosition().y)}
                sx={{ backgroundColor: selected.length > 1 ? '#565656' : undefined }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Box display={'flex'} alignItems={'center'} padding={2}>
              <Typography variant="subtitle1" marginRight={2} color={'#C7C7C7'}>
                W:
              </Typography>
              <TextField
                size="small"
                disabled={selected.length !== 1 || selected[0] instanceof Text}
                margin="dense"
                inputProps={{ style: { color: 'white' } }}
                type="number"
                onChange={e => handleChangeSize(e, 'width')}
                value={
                  selected.length === 1 && !(selected[0] instanceof Text) && Math.floor(selected[0].getSize().width)
                }
                sx={{ backgroundColor: selected.length > 1 ? '#565656' : undefined }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box display={'flex'} alignItems={'center'} padding={2}>
              <Typography variant="subtitle1" marginRight={2} color={'#C7C7C7'}>
                H:
              </Typography>
              <TextField
                size="small"
                disabled={selected.length !== 1 || selected[0] instanceof Text}
                margin="dense"
                inputProps={{ style: { color: 'white' } }}
                type="number"
                onChange={e => handleChangeSize(e, 'height')}
                value={
                  selected.length === 1 && !(selected[0] instanceof Text) && Math.floor(selected[0].getSize().height)
                }
                sx={{ backgroundColor: selected.length > 1 ? '#565656' : undefined }}
              />
            </Box>
          </Grid>
        </Grid>
        {selected.length !== 0 && (selected[0] instanceof ConcreteShape || selected[0] instanceof ConcreteText) && (
          <Box paddingX={2}>
            <Typography variant="body2" color={'#C7C7C7'}>
              Fill
            </Typography>
            <Box mt={2} display={'flex'}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: selected.length === 1 ? selected[0].getColor() : '#FFF',
                  borderRadius: 2,
                  mr: 2,
                  border: '0.5px solid white'
                }}
                onClick={handleOpenPalette}
              />
              <Typography variant="body1" marginRight={2} color={'#C7C7C7'}>
                {selected.length === 0 ? '' : selected.length === 1 ? selected[0].getColor() : 'Mixed'}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      {(selected[0] instanceof ConcreteShape || selected[0] instanceof ConcreteText) && (
        <Dialog open={isOpenPalette} onClose={() => setIsOpenPalette(false)}>
          <SketchPicker
            color={selected.length ? selected[0].getColor() : '#FFF'}
            onChangeComplete={handleChangeColor}
          />
        </Dialog>
      )}
    </Box>
  )
}
export default PropertyWindow
