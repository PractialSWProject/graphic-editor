import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import CreatedComposite from '../../models/composite/created'
import { useState } from 'react'
import LayerInfo from './LayerInfo'
import Elements from '../../models/Elements'
import { Box, Button, ButtonGroup } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Konva from 'konva'

interface Props {
  createdComposite: CreatedComposite
  layerRef: React.MutableRefObject<any>
  elementListener: () => void
}

const LayerWindow = ({ createdComposite, layerRef, elementListener }: Props) => {
  const createdElements = createdComposite.get()
  const layerRefCurrent = layerRef.current

  const [updateLayers, setUpdateLayers] = useState(false)

  createdComposite.listenForLayerChanges(() => {
    setUpdateLayers(!updateLayers)
  })

  let rows = createdElements.map((el, index) => ({
    id: el.id,
    shape: el,
    rowId: index,
    name: el,
    zIndex: el.zIndex,
    zIndexChange: el
  }))

  rows = rows.sort((a, b) => b.zIndex - a.zIndex)
  const maxZIndex = rows.length

  const handleZIndexChange = (element: Elements, direction: 'up' | 'down') => {
    const zIndexChange = direction === 'up' ? 1 : -1
    const currentZIdex = element.zIndex
    const newZIndex = currentZIdex + zIndexChange

    const elementWithNewZIndex = createdElements.find(el => el.zIndex === newZIndex)

    if (layerRefCurrent) {
      const node = layerRefCurrent.getChildren().find((node: Konva.Shape) => Number(node.attrs.id) === element.id)
      const nodeWithNewZIndex = layerRefCurrent
        .getChildren()
        .find((node: Konva.Shape) => Number(node.attrs.id) === elementWithNewZIndex?.id)

      const newNodeZIndex = node.zIndex()

      node.zIndex(nodeWithNewZIndex.zIndex())
      nodeWithNewZIndex.zIndex(newNodeZIndex)
      layerRefCurrent.draw()

      elementListener()
    }

    if (elementWithNewZIndex) {
      createdComposite.updateZIndex(element.id, newZIndex)
      createdComposite.updateZIndex(elementWithNewZIndex.id, currentZIdex)
    }
  }

  const handleZIndexUp = (element: Elements) => {
    handleZIndexChange(element, 'up')
  }

  const handleZIndexDown = (element: Elements) => {
    handleZIndexChange(element, 'down')
  }

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
      width: 150,
      renderCell: (params: GridRenderCellParams<{ id: number; shape: Elements; rowId: number }>) => (
        <LayerInfo element={params.value} />
      )
    },
    {
      field: 'zIndexChange',
      width: 100,
      renderCell: (params: GridRenderCellParams<{ id: number; shape: Elements; rowId: number }>) => (
        <Box>
          <ButtonGroup variant="text" aria-label="text button group" size="small" sx={{ color: 'white' }}>
            <Button
              disabled={params.value.zIndex === maxZIndex}
              sx={{
                backgroundColor: params.value.zIndex === maxZIndex ? 'white' : '#434343',
                color: '#C7C7C7'
              }}
              onClick={() => handleZIndexUp(params.value)}
            >
              <KeyboardArrowUpIcon />
            </Button>
            <Button
              disabled={params.value.zIndex === 1}
              sx={{ backgroundColor: params.value.zIndex === 1 ? 'white' : '#434343', color: '#C7C7C7' }}
              onClick={() => handleZIndexDown(params.value)}
            >
              <KeyboardArrowDownIcon />
            </Button>
          </ButtonGroup>
        </Box>
      )
    }
  ]

  return <DataGrid rows={rows} columns={columns} hideFooter columnHeaderHeight={0} />
}

export default LayerWindow
