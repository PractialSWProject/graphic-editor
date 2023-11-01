// import { Dispatch, SetStateAction } from 'react'
// import { Text } from 'react-konva'
// import { TextElementT } from '../type'

// interface Props {
//   texts: TextElementT[]
//   setTexts: Dispatch<SetStateAction<TextElementT[]>>
// }

// const TextView = ({ texts, setTexts }: Props) => {
//   const updatePosition = (id: number, x: number, y: number) => {
//     const newTextElement = texts.map(el => {
//       if (el.id === id) {
//         el.text.setPosition({ x, y })
//         return {
//           id: el.id,
//           text: el.text
//         }
//       } else {
//         return el
//       }
//     })
//     setTexts(newTextElement)
//   }
//   return (
//     <>
//       {texts.map(el => (
//         <Text
//           key={el.id}
//           x={el.text.getPosition().x}
//           y={el.text.getPosition().y}
//           text={el.text.getContent()}
//           fontSize={el.text.getFontSize()}
//           onDragEnd={e => {
//             updatePosition(el.id, e.target.x(), e.target.y())
//           }}
//           draggable
//         />
//       ))}
//     </>
//   )
// }

// export default TextView

import React from 'react'

function TextView() {
  return (
    <div>TextView</div>
  )
}

export default TextView