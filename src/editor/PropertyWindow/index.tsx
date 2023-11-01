import { Box, Dialog, Divider, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
import CreatedComposite from '../../models/composite/created'

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

  return (
    <Box>
      <Box style={{ height: 50, backgroundColor: '#434343' }}></Box>
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
                value={selected.length === 1 && Math.floor(selected[0].properties.position.x)}
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
                value={selected.length === 1 && Math.floor(selected[0].properties.position.y)}
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
                disabled={selected.length !== 1}
                margin="dense"
                inputProps={{ style: { color: 'white' } }}
                type="number"
                value={selected.length === 1 && Math.floor(selected[0].properties.size.width)}
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
                disabled={selected.length !== 1}
                margin="dense"
                inputProps={{ style: { color: 'white' } }}
                type="number"
                value={selected.length === 1 && Math.floor(selected[0].properties.size.height)}
                sx={{ backgroundColor: selected.length > 1 ? '#565656' : undefined }}
              />
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: '#333' }} />
        {selected.length !== 0 && (
          <Box padding={2}>
            <Typography variant="body2" color={'#C7C7C7'}>
              Fill
            </Typography>
            <Box mt={2} display={'flex'}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: selected.length === 1 ? selected[0].properties.color : '#FFF',
                  borderRadius: 2,
                  mr: 2
                }}
                onClick={handleOpenPalette}
              />
              <Typography variant="body1" marginRight={2} color={'#C7C7C7'}>
                {selected.length === 0 ? '' : selected.length === 1 ? selected[0].properties.color : 'Mixed'}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Dialog open={isOpenPalette} onClose={() => setIsOpenPalette(false)}>
        <SketchPicker
          color={selected.length ? selected[0].properties.color : '#FFF'}
          onChangeComplete={handleChangeColor}
        />
      </Dialog>
    </Box>
  )
}
export default PropertyWindow
