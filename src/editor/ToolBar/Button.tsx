import { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  icon: string
  children?: ReactNode
  onClick?: () => void
}

function Button({ icon, children, onClick }: Props) {
  return (
    <ButtonWrapper onClick={onClick}>
      <img alt="icon" src={icon} />
      {children}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  &:hover {
    background-color: #31a8fe;
  }
`

export default Button
