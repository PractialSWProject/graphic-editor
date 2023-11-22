import { Circle, Rectangle as RectIcon, Remove, Title, Image as ImageIcon } from '@mui/icons-material'
import Elements from '../../models/Elements'
import Ellipse from '../../models/Elements/Shapes/ellipse'
import Rectangle from '../../models/Elements/Shapes/rectangle'
import { Typography } from '@mui/material'
import Line from '../../models/Elements/Shapes/line'
import Text from '../../models/Elements/Text'

interface Props {
  element: Elements
  isIcon?: boolean
}

function LayerInfo({ element, isIcon = false }: Props) {
  if (element instanceof Ellipse) {
    return isIcon ? <Circle sx={{ color: element.color }} /> : <Typography>{`Ellipse ${element.id}`}</Typography>
  } else if (element instanceof Rectangle) {
    return isIcon ? <RectIcon sx={{ color: element.color }} /> : <Typography>{`Rectangle ${element.id}`}</Typography>
  } else if (element instanceof Line) {
    return isIcon ? <Remove sx={{ color: element.color }} /> : <Typography>{`Line ${element.id}`}</Typography>
  } else if (element instanceof Text) {
    return isIcon ? <Title sx={{ color: element.color }} /> : <Typography>{`Text ${element.id}`}</Typography>
  } else {
    return isIcon ? <ImageIcon /> : <Typography>{`Image ${element.id}`}</Typography>
  }
}

export default LayerInfo
