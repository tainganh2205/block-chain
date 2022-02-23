
import React from 'react'
import styled from 'styled-components'
import { WrapperPage } from 'components/Art'
import Header from './Header'
import AppBody from '../AppBody'
import FormDetail from './FormDetail'
import FormBody from './FormBody'


const AppBody1 = styled.div`
  position: relative;
  max-width: 600;
  width: 100%;
  z-index: 5;
`

const PageWrapper = styled(WrapperPage)`
  width: 100%;
  background: linear-gradient(199.07deg, rgba(13, 14, 17, 0.26) -30.81%, rgba(13, 14, 17, 0.35) -30.77%, #5FF985 342.39%);
  padding-top: 46px;
  padding-bottom: 110px;
  .wrapper-body{
    margin: auto
  }
`

const Info = () => {

  return (
    <PageWrapper>
      <FormBody>
        <Header title="Activate Profile" description="Create Author Profile" />   
        <FormDetail />
      </FormBody>

    </PageWrapper>
  )
}

export default Info
