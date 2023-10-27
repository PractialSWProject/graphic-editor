import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { VariantT } from '../type'

interface Props {
  left: number
  outlinedImg: string
  filledImg: string
  createElement: (variant: VariantT) => void
  closeWindow: () => void
}

function OptionWindow({ left, outlinedImg, filledImg, createElement, closeWindow }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const listener = (event: { target: any }) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      closeWindow()
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, closeWindow])

  return (
    <Wrapper left={left} ref={ref}>
      <Triangle />
      <Window>
        <Option
          onClick={() => {
            createElement('outlined')
            closeWindow()
          }}
        >
          <img alt="outlined" src={outlinedImg} />
          <div>Outlined</div>
        </Option>
        <Option
          onClick={() => {
            createElement('filled')
            closeWindow()
          }}
        >
          <img alt="filled" src={filledImg} />
          <div>Filled</div>
        </Option>
      </Window>
    </Wrapper>
  )
}

export default OptionWindow

const Wrapper = styled.div<{ left: number }>`
  position: absolute;
  top: 60px;
  left: ${({ left }) => left}px;
`

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-bottom: 8px solid #434343;
  border-top: 8px solid transparent;
  border-left: 8px solid #434343;
  border-right: 8px solid transparent;
`

const Window = styled.div`
  width: 150px;
  height: 80px;
  background-color: #434343;
`
const Option = styled.div`
  display: flex;
  align-items: center;
  padding-left: 7px;
  height: 40px;
  gap: 13px;
  cursor: pointer;

  color: #ffffff;
  font-family: Inter;
  font-size: 15px;
  font-weight: 500;

  &:hover {
    background-color: #31a8fe;
  }
`
