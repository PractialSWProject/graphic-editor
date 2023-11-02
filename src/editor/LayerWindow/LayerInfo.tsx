import { Circle, Rectangle as RectIcon, Remove } from '@mui/icons-material'
import Elements from '../../models/Elements'
import Ellipse from '../../models/Elements/Shapes/ellipse'
import Rectangle from '../../models/Elements/Shapes/rectangle'
import { Typography } from '@mui/material'

interface Props {
  element: Elements
  isIcon?: boolean
}

function LayerInfo({ element, isIcon = false }: Props) {
  if (element instanceof Ellipse) {
    return isIcon ? (
      <Circle sx={{ color: element.properties.color }} />
    ) : (
      <Typography>{`Ellipse ${element.id}`}</Typography>
    )
  } else if (element instanceof Rectangle) {
    return isIcon ? (
      <RectIcon sx={{ color: element.properties.color }} />
    ) : (
      <Typography>{`Rectangle ${element.id}`}</Typography>
    )
  }

  return isIcon ? (
    <Remove sx={{ color: element.properties.color }} />
  ) : (
    <Typography>{`Line ${element.id}`}</Typography>
  )
}

export default LayerInfo
