import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import CreatedComposite from '../../models/composite/created'
import { useState } from 'react'
import LayerInfo from './LayerInfo'
import Elements from '../../models/Elements'

interface Props {
  createdComposite: CreatedComposite
}

const LayerWindow = ({ createdComposite }: Props) => {
  const createdElements = createdComposite.get()

  const [updateLayers, setUpdateLayers] = useState(false)

  createdComposite.listenForLayerChanges(() => {
    setUpdateLayers(!updateLayers)
  })

  const rows = createdElements.map((el, index) => ({
    id: el.id,
    shape: el,
    rowId: index,
    name: el
  }))

  const columns: GridColDef[] = [
    {
      field: 'shape',
      width: 25,
      renderCell: (params: GridRenderCellParams<{ id: number; shape: Elements; rowId: number }>) => (
        <LayerInfo element={params.value} isIcon />
      )
    },
    {
      field: 'name',
      width: 200,
      renderCell: (params: GridRenderCellParams<{ id: number; shape: Elements; rowId: number }>) => (
        <LayerInfo element={params.value} />
      )
    }
  ]

  return <DataGrid rows={rows} columns={columns} hideFooter columnHeaderHeight={0} />
}

export default LayerWindow
