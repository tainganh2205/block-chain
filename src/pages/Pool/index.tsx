import React, { useContext, useMemo } from 'react'
import { Pair } from '@lfwfinance/sdk'
import { Button, CardBody, Text, Heading } from '@artechain/uikit'
import { Link } from 'react-router-dom'
import CardNav from 'components/CardNav'
import Question from 'components/QuestionHelper'
import FullPositionCard from 'components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { StyledInternalLink } from 'components/Shared'
import { LightCard } from 'components/Card'
import BoxFreeWithdraw from 'components/BoxFreeWithdraw'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'
import styled, { ThemeContext } from 'styled-components'
import { useActiveWeb3React } from 'hooks'
import { usePairs } from 'data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { Dots } from 'components/swap/styleds'
import TranslatedText from 'components/TranslatedText'
import { TranslateString } from 'utils/translateTextHelpers'
import PageHeader from 'components/PageHeader'
import { WrapperContainer, WrapperHeaderArticle, WrapperPage } from 'components/Art'
import AppBody from '../AppBody'

const PageWrapper = styled(WrapperPage)`
  // background: linear-gradient(
  //   199.07deg,
  //   rgba(13, 14, 17, 0.26) -30.81%,
  //   rgba(13, 14, 17, 0.35) -30.77%,
  //   #5ff985 342.39%
  // );
  padding-top: 46px;
  padding-bottom: 110px;
  .wrapper-body {
    margin: auto;
  };
  width: 100%;
  height: 100%;
  background: url(./images/lfw-swap-banner.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

export default function Pool() {
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens,
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  return (
    <PageWrapper className="full-with bg-main-wrapper">
      <WrapperHeaderArticle>
        <Heading as="h1" mb="8px" className="title">
          Liquidity Provider
        </Heading>
        <Text mb="8px" className="subtitle">
          Token trading and instant liquidity processing
        </Text>
      </WrapperHeaderArticle>
      <CardNav activeIndex={1} />
      <AppBody>
        <WrapperContainer>
          {/* <BoxFreeWithdraw /> */}
          <PageHeader title="Liquidity" description="Add liquidity to receive LP tokens">
            <Button className="btn-art-primary" width="100%" id="join-pool-button" as={Link} to="/add/BNB">
              <TranslatedText translationId={100}>Add Liquidity</TranslatedText>
            </Button>
          </PageHeader>
          <AutoColumn gap="lg" justify="center">
            <CardBody>
              <AutoColumn gap="12px" style={{ width: '100%' }}>
                <RowBetween padding="0 8px">
                  <Text className="cl-white" bold>
                    <TranslatedText translationId={102}>Your Liquidity</TranslatedText>
                  </Text>
                  <Question
                    text={TranslateString(
                      130,
                      'When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below.'
                    )}
                  />
                </RowBetween>

                {!account ? (
                  <LightCard padding="40px">
                    <Text className="cl-primary" textAlign="center">
                      Connect to a wallet to view your liquidity.
                    </Text>
                  </LightCard>
                ) : v2IsLoading ? (
                  <LightCard padding="40px">
                    <Text className="cl-yel" textAlign="center">
                      <Dots>Loading</Dots>
                    </Text>
                  </LightCard>
                ) : allV2PairsWithLiquidity?.length > 0 ? (
                  <>
                    {allV2PairsWithLiquidity.map((v2Pair) => (
                      <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                    ))}
                  </>
                ) : (
                  <LightCard padding="40px" className="cl-disable-primary">
                    <Text className="cl-white" textAlign="center">
                      <TranslatedText translationId={104}>No liquidity found.</TranslatedText>
                    </Text>
                  </LightCard>
                )}

                <div>
                  <Text className="cl-white" fontSize="14px" style={{ padding: '.5rem 0 .5rem 0' }}>
                    {TranslateString(106, "Don't see a pool you joined?")}{' '}
                    <StyledInternalLink className="cl-yel" id="import-pool-link" to="/find">
                      {TranslateString(108, 'Import it.')}
                    </StyledInternalLink>
                  </Text>

                  <Text fontSize="14px" style={{ padding: '.5rem 0 .5rem 0' }}>
                    Or, if you staked your FLIP tokens in a farm, unstake them to see them here.
                  </Text>
                </div>
              </AutoColumn>
            </CardBody>
          </AutoColumn>
        </WrapperContainer>
      </AppBody>
    </PageWrapper>
  )
}
