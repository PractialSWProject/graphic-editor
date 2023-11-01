import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CreatedComposite from '../../models/composite/created'
import { useMemo, useState } from 'react'

interface Props {
  createdComposite: CreatedComposite
}

const LayerWindow = ({ createdComposite }: Props) => {
  const createdElements = createdComposite.get()

  const [updateLayers, setUpdateLayers] = useState(false)

  createdComposite.listenForLayerChanges(() => {
    setUpdateLayers(!updateLayers)
  })

  const rows = createdElements.map(el => ({
    id: el.id,
    color: el.properties.color
  }))

  const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'type', headerType: 'TYPE', width: 120 },
    {
      field: 'color',
      headerName: 'COLOR',
      width: 100
    }
  ]
  return <DataGrid rows={rows} columns={columns} hideFooter />
}

export default LayerWindow
