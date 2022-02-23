import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Heading, Text, Flex} from '@artechain/uikit'

interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
}

const StyledPageHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 30px;
  padding-top: 30px;
`
const Details = styled.div`
  flex: 1;
`

const Header = ({ title, description }: PageHeaderProps) => {
  return (
    <StyledPageHeader>
      <Flex alignItems="center">
        <Details>
          <Heading mb="8px">{title}</Heading>
          {description && (
            <Text color="textSubtle" fontSize="14px">
              {description}
            </Text>
          )}
        </Details>  
      </Flex>
    </StyledPageHeader>
  )
}

export default Header
