import { Circle, Rectangle as RectIcon, Remove, Title, Image as ImageIcon } from '@mui/icons-material'
import { Typography } from '@mui/material'

import { ConcreteElement, ConcreteShape, ConcreteText } from '../../models/elementConcrete'
import { ELLIPSE, LINE } from '../../models/elementAbstract'
interface Props {
  element: ConcreteElement
  isIcon?: boolean
}

function LayerInfo({ element, isIcon = false }: Props) {
  if (element instanceof ConcreteShape) {
    const color = element.getColor()
    const id = element.getId()

    switch (element.getType()) {
      case ELLIPSE: {
        return isIcon ? <Circle sx={{ color }} /> : <Typography>{`Ellipse ${id}`}</Typography>
      }
      case LINE: {
        return isIcon ? <Remove sx={{ color }} /> : <Typography>{`Line ${id}`}</Typography>
      }
      default: {
        return isIcon ? <RectIcon sx={{ color }} /> : <Typography>{`Rectangle ${id}`}</Typography>
      }
    }
  } else if (element instanceof ConcreteText) {
    return isIcon ? <Title sx={{ color: element.getColor() }} /> : <Typography>{`Text ${element.getId()}`}</Typography>
  } else {
    return isIcon ? <ImageIcon /> : <Typography>{`Image ${element.getId()}`}</Typography>
  }
}

export default LayerInfo
