import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import LayerInfo from './LayerInfo'
import { Box, Button, ButtonGroup, Typography, styled } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Konva from 'konva'
import ElementListSingleton from '../../models/singleton'
import { ConcreteElement } from '../../models/elementConcrete'
import { LayerObserver } from '../../models/observer'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface Props {
  layerRef: React.MutableRefObject<any>
}

const elementListSingleton = ElementListSingleton.getInstance()
const layerObserver = LayerObserver.getInstance()

const LayerWindow = ({ layerRef }: Props) => {
  const createdElements = elementListSingleton.getElements()
  const layerRefCurrent = layerRef.current

  const [render, setRerender] = useState(false)

  useEffect(() => {
    layerObserver.setRerenderMethod(() => {
      setRerender(!render)
    })
  }, [render])

  let rows = createdElements.map((el, index) => ({
    id: el.getId(),
    shape: el,
    rowId: index,
    name: el,
    zIndex: el.getZIndex(),
    zIndexChange: el,
    isSelected: el.getIsSelected(),
    visibility: el
  }))

  rows = rows.sort((a, b) => b.zIndex - a.zIndex)
  const maxZIndex = rows.length

  const handleZIndexChange = (element: ConcreteElement, direction: 'up' | 'down') => {
    const zIndexChange = direction === 'up' ? 1 : -1
    const currentZIdex = element.getZIndex()
    const newZIndex = currentZIdex + zIndexChange

    const elementWithNewZIndex = createdElements.find(el => el.getZIndex() === newZIndex)

    if (layerRefCurrent) {
      const node = layerRefCurrent.getChildren().find((node: Konva.Shape) => Number(node.attrs.id) === element.getId())
      const nodeWithNewZIndex = layerRefCurrent
        .getChildren()
        .find((node: Konva.Shape) => Number(node.attrs.id) === elementWithNewZIndex?.getId())

      const newNodeZIndex = node.zIndex()

      node.zIndex(nodeWithNewZIndex.zIndex())
      nodeWithNewZIndex.zIndex(newNodeZIndex)
      layerRefCurrent.draw()
    }

    if (elementWithNewZIndex) {
      elementListSingleton.updateZIndex(element.getId(), newZIndex)
      elementListSingleton.updateZIndex(elementWithNewZIndex.getId(), currentZIdex)
    }
  }

  const handleZIndexUp = (element: ConcreteElement) => {
    handleZIndexChange(element, 'up')
  }

  const handleZIndexDown = (element: ConcreteElement) => {
    handleZIndexChange(element, 'down')
  }

  const handleVisibility = (element: ConcreteElement) => {
    elementListSingleton.updateVisibility(element.getId())
  }

  // const handleClickRow: (params: GridRowParams) => void = params => {
  //   const element = elementListSingleton.getElements().find(el => el.getId() === params.row.id);
  //   keyboardState.handleClickElement(element);
  // };

  const columns: GridColDef[] = [
    {
      field: 'shape',
      width: 25,
      renderCell: (params: GridRenderCellParams<{ id: number; shape: ConcreteElement; rowId: number }>) => (
        <LayerInfo element={params.value} isIcon />
      )
    },
    {
      field: 'name',
      width: 150,
      renderCell: (params: GridRenderCellParams<{ id: number; shape: ConcreteElement; rowId: number }>) => (
        <LayerInfo element={params.value} />
      )
    },
    {
      field: 'zIndexChange',
      width: 100,
      renderCell: (params: GridRenderCellParams<{ id: number; shape: ConcreteElement; rowId: number }>) => (
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
    },
    {
      field: 'visibility',
      width: 100,
      renderCell: (params: GridRenderCellParams<{ id: number; shape: ConcreteElement; rowId: number }>) => (
        <Box>
          <Button onClick={() => handleVisibility(params.value)}>
            {params.value.getIsVisible() ? (
              <Visibility sx={{ color: 'darkgray' }} />
            ) : (
              <VisibilityOff sx={{ color: 'lightgray' }} />
            )}
          </Button>
        </Box>
      )
    }
  ]

  return (
    <Box height={'50vh'} sx={{ backgroundColor: '#FFF' }}>
      <Typography variant="subtitle1" sx={{ color: '#C7C7C7', padding: 2 }}>
        레이어
      </Typography>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        hideFooter
        columnHeaderHeight={0}
        getRowClassName={params => (params.row.isSelected ? 'isSelected' : '')}
      />
    </Box>
  )
}

export default LayerWindow

const StyledDataGrid = styled(DataGrid)`
  .isSelected {
    background-color: #666;
    &:hover {
      background-color: #777;
    }
  }
  height: 100%;
`
