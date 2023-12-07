import { Box, Dialog, Divider, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
import CreatedComposite from '../../models/composite/created'
import Text from '../../models/Elements/Text'
import { Shapes } from '../../models/Elements'

interface Props {
  createdComposite: CreatedComposite
}

function PropertyWindow({ createdComposite }: Props) {
  const [isOpenPalette, setIsOpenPalette] = useState(false)
  const [updateProperty, setUpdateProperty] = useState(false)

  createdComposite.listenForPropertyWindow(() => {
    setUpdateProperty(!updateProperty)
  })

  const selected = createdComposite.getSelected()

  const handleOpenPalette = () => {
    if (selected.length > 1) return
    setIsOpenPalette(isOpenPalette => !isOpenPalette)
  }

  const handleChangeColor = (color: { hex: string }) => {
    createdComposite.updateColor(selected[0].id, color.hex)
  }

  const handleChangePosition = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, xy: string) => {
    const newXY = parseFloat(e.target.value)
    if (!isNaN(newXY)) {
      const currentPosition = selected[0].position
      const newPosition = xy === 'x' ? { ...currentPosition, x: newXY } : { ...currentPosition, y: newXY }
      createdComposite.updatePosition(selected[0].id, newPosition)
    }
  }

  const handleChangeSize = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, wh: string) => {
    const newWH = parseFloat(e.target.value)
    if (!isNaN(newWH)) {
      const currentPosition = selected[0].size
      const newSize = wh === 'height' ? { ...currentPosition, height: newWH } : { ...currentPosition, width: newWH }
      createdComposite.updateSize(selected[0].id, newSize)
    }
  }

  return (
    <Box height={'50vh'}>
      <Box style={{ height: '7vh', backgroundColor: '#434343' }}></Box>
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
                value={selected.length === 1 && Math.floor(selected[0].position.x)}
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
                value={selected.length === 1 && Math.floor(selected[0].position.y)}
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
                value={selected.length === 1 && !(selected[0] instanceof Text) && Math.floor(selected[0].size.width)}
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
                value={selected.length === 1 && !(selected[0] instanceof Text) && Math.floor(selected[0].size.height)}
                sx={{ backgroundColor: selected.length > 1 ? '#565656' : undefined }}
              />
            </Box>
          </Grid>
        </Grid>
        {selected.length !== 0 && (selected[0] instanceof Shapes || selected[0] instanceof Text) && (
          <Box paddingX={2}>
            <Typography variant="body2" color={'#C7C7C7'}>
              Fill
            </Typography>
            <Box mt={2} display={'flex'}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: selected.length === 1 ? selected[0].color : '#FFF',
                  borderRadius: 2,
                  mr: 2,
                  border: '0.5px solid white'
                }}
                onClick={handleOpenPalette}
              />
              <Typography variant="body1" marginRight={2} color={'#C7C7C7'}>
                {selected.length === 0 ? '' : selected.length === 1 ? selected[0].color : 'Mixed'}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      {(selected[0] instanceof Shapes || selected[0] instanceof Text) && (
        <Dialog open={isOpenPalette} onClose={() => setIsOpenPalette(false)}>
          <SketchPicker color={selected.length ? selected[0].color : '#FFF'} onChangeComplete={handleChangeColor} />
        </Dialog>
      )}
    </Box>
  )
}
export default PropertyWindow
