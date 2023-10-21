import { Box } from '@mui/material'

function PropertyWindow() {
  return (
    <Box>
      속성창...계획
      <p>공통: </p>
      <p>사이즈 조절, (w, h), 위치 조절 (x, y), zIndex</p>
    
      <p>사진 : Url 입력란</p>

      <p>텍스트: 색상 팔레트, 폰트 사이즈, **내용 입력란**</p>
      <p>도형: color ONLY</p>
      <p>line, rect(filled, outlined) ellipse(filled, outlined)</p>
    </Box>
  )
}
export default PropertyWindow
