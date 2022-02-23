import styled from 'styled-components'

interface StyledContainerProps {
  width: number
  padding: number | string
}

const Container = styled.div<StyledContainerProps>`
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 100%;
  padding: ${(props) => `${props.padding}px`};
  width: ${(props) => `${props.width}px`};
`

export default Container
