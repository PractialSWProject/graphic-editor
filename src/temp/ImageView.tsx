// import { Image } from 'react-konva'
// import { ImageElementT } from '../type'
// import { Dispatch, SetStateAction } from 'react'

// interface Props {
//   images: ImageElementT[]
//   setImages: Dispatch<SetStateAction<ImageElementT[]>>
// }

// const ImageView = ({ images, setImages }: Props) => {
//   const updatePosition = (id: number, x: number, y: number) => {
//     const newImageElement = images.map(el => {
//       if (el.id === id) {
//         el.img.setPosition({ x, y })
//         return {
//           id: el.id,
//           img: el.img
//         }
//       } else {
//         return el
//       }
//     })
//     setImages(newImageElement)
//   }
//   return (
//     <>
//       {images.map(el => {
//         const image = new window.Image()
//         image.src = el.img.getImageUrl()

//         return (
//           <Image
//             key={el.id}
//             x={el.img.getPosition().x}
//             y={el.img.getPosition().y}
//             image={image}
//             width={el.img.getSize().width}
//             height={el.img.getSize().height}
//             onDragEnd={e => {
//               updatePosition(el.id, e.target.x(), e.target.y())
//             }}
//             draggable
//           />
//         )
//       })}
//     </>
//   )
// }

// export default ImageView

import React from 'react'

function ImageView() {
  return <div>ImageView</div>
}

export default ImageView
