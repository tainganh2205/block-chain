import styled from 'styled-components'
import Logo from '../Logo'

const CoinLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  color: #787777;
  border-radius: 50px;
`

export default CoinLogo
