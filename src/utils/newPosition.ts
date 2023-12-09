import { DEFAULT_POS } from '../models/elementAbstract'

let newPosition = DEFAULT_POS

const getNewPosition = () => {
  newPosition = {
    x: newPosition.x + 10,
    y: newPosition.y + 10
  }
  return newPosition
}

export default getNewPosition
