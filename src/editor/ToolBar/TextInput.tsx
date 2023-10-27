import { useRef, useEffect, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

interface Props {
  input: string
  setInput: Dispatch<SetStateAction<string>>
  createText: () => void
  close: () => void
}

function TextInput({ input, setInput, createText, close }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const listener = (event: { target: any }) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      close()
      setInput('')
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, setInput, close])
  return (
    <Wrapper ref={ref}>
      <Input value={input} onChange={e => setInput(e.target.value)} />
      <Button
        onClick={() => {
          createText()
          close()
        }}
      >
        Create
      </Button>
    </Wrapper>
  )
}

export default TextInput

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  left: 160px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 40px;
  padding: 0 7px;
  background-color: #434343;
`
const Input = styled.input`
  width: 295px;
  height: 27px;
  border-radius: 5px;
`
const Button = styled.button`
  width: 80px;
  height: 27px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background-color: transparent;

  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
`
