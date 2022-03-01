import { CardBody, Text, Flex, ConnectorId, useWalletModal } from '@artechain/uikit'
import { useWeb3React } from '@web3-react/core'
import { ButtonArt as Button, WrapperContainer, WrapperPage } from 'components/Art'
import CardNav from 'components/CardNav'
import { AutoColumn } from 'components/Column'
import { TransactionTabs } from 'components/NavigationTabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { injected, walletconnect } from 'connectors'
import styled from 'styled-components'
import AppBody from '../AppBody'

const PageWrapper = styled(WrapperPage)`
  background: url(./images/lfw-swap-banner.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-top: 46px;
  padding-bottom: 110px;
  .wrapper-body{
    margin: auto
  }
`

export default function Transactions() {
  const { t } = useTranslation()
  const { account, activate, deactivate } = useWeb3React()

  const handleLogin = (connectorId: ConnectorId) => {
    if (connectorId === 'walletconnect') {

      return activate(walletconnect)
    }
    return activate(injected)
  }

  const { onPresentConnectModal } = useWalletModal(handleLogin, deactivate, account as string)
  return (
    <PageWrapper className="full-with">
      <CardNav activeIndex={3} />
      <AppBody>
      <WrapperContainer>
        <TransactionTabs />
        <CardBody>
          <AutoColumn gap="md">
            {/* !TODO */}
            {
              !account ? (
                <>
                <Text  fontSize='14px' className='cl-gray'>Please connect your wallet to view your recent transactions</Text>
                <Button onClick={onPresentConnectModal}>Connect Wallet</Button>
                </>
              ) :
              (
                <Flex flexDirection='column' alignItems='center'>
                  <img alt='' className='swap-icon' src='/images/defaultNew2.png' width={120} height={105} />
                  <Text className='cl-gray' textAlign="center" mb="20px">
                    {t('No results transactions.')}
                  </Text>
                </Flex>
              )
            }
          </AutoColumn>

        </CardBody>
        </WrapperContainer>
      </AppBody>
    </PageWrapper>
  )
}
