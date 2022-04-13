import { Currency, ETHER, JSBI, TokenAmount } from '@lfwfinance/sdk-dev'
import React, { useCallback, useEffect, useState } from 'react'
import { ChevronDownIcon, AddIcon, CardBody, Text } from '@artechain/uikit'
import CardNav from 'components/CardNav'
import { LightCard } from 'components/Card'
import { AutoColumn, ColumnCenter } from 'components/Column'
import CurrencyLogo from 'components/CurrencyLogo'
import { FindPoolTabs } from 'components/NavigationTabs'
import { MinimalPositionCard } from 'components/PositionCard'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { PairState, usePair } from 'data/Reserves'
import { useActiveWeb3React } from 'hooks'
import { usePairAdder } from 'state/user/hooks'
import { useTokenBalance } from 'state/wallet/hooks'
import { StyledInternalLink } from 'components/Shared'
import { currencyId } from 'utils/currencyId'
import TranslatedText from 'components/TranslatedText'
import { WrapperContainer, WrapperPage, ButtonArt as Button } from 'components/Art'
import styled from 'styled-components'
import AppBody from '../AppBody'
import { Dots } from '../Pool/styleds'

const PageWrapper = styled(WrapperPage)`
  // background: linear-gradient(199.07deg, rgba(13, 14, 17, 0.26) -30.81%, rgba(13, 14, 17, 0.35) -30.77%, #5FF985 342.39%);
  padding-top: 46px;
  padding-bottom: 110px;
  .wrapper-body{
    margin: auto
  };
  width: 100%;
  height: 100%;
  background: url(./images/lfw-swap-banner.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1
}

export default function PoolFinder() {
  const { account } = useActiveWeb3React()

  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)

  const [currency0, setCurrency0] = useState<Currency | null>(ETHER)
  const [currency1, setCurrency1] = useState<Currency | null>(null)

  const [pairState, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)
  const addPair = usePairAdder()
  useEffect(() => {
    if (pair) {
      addPair(pair)
    }
  }, [pair, addPair])

  const validPairNoLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        JSBI.equal(pair.reserve0.raw, JSBI.BigInt(0)) &&
        JSBI.equal(pair.reserve1.raw, JSBI.BigInt(0))
    )

  const position: TokenAmount | undefined = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const hasPosition = Boolean(position && JSBI.greaterThan(position.raw, JSBI.BigInt(0)))

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField]
  )

  const handleSearchDismiss = useCallback(() => {
    setShowSearch(false)
  }, [setShowSearch])

  const prerequisiteMessage = (
    // <LightCard padding="45px 10px">
      <Text style={{ textAlign: 'center', margin:'20px auto' }} className='cl-gray'>
        {!account ? 'Connect to a wallet to find pools' : 'Select a token to find your liquidity.'}
      </Text>
    // </LightCard>
  )

  return (
    <PageWrapper className="full-with">
      <CardNav activeIndex={1} />
      <AppBody>
      <WrapperContainer>
        <FindPoolTabs />
        <CardBody>
          <AutoColumn gap="md">
            <Button
              onClick={() => {
                setShowSearch(true)
                setActiveField(Fields.TOKEN0)
              }}
              startIcon={currency0 ? <CurrencyLogo currency={currency0} style={{ marginRight: '.5rem' }} /> : null}
              endIcon={<ChevronDownIcon width="24px" color="white" />}

            >
              {currency0 ? currency0.symbol : <TranslatedText translationId={82}>Select a Token</TranslatedText>}
            </Button>

            <ColumnCenter>
              <AddIcon color="textSubtle" />
            </ColumnCenter>

            <Button
              onClick={() => {
                setShowSearch(true)
                setActiveField(Fields.TOKEN1)
              }}
              startIcon={currency1 ? <CurrencyLogo currency={currency1} style={{ marginRight: '.5rem' }} /> : null}
              endIcon={<ChevronDownIcon width="24px" color="white" />}

            >
              {currency1 ? currency1.symbol : <TranslatedText translationId={82}>Select a Token</TranslatedText>}
            </Button>

            {hasPosition && (
              <ColumnCenter
                style={{ justifyItems: 'center', backgroundColor: '', padding: '12px 0px', borderRadius: '12px' }}
              >
                <Text style={{ textAlign: 'center' }}>Pool Found!</Text>
              </ColumnCenter>
            )}
            {currency0 && currency1 ? (
              pairState === PairState.EXISTS ? (
                hasPosition && pair ? (
                  <MinimalPositionCard pair={pair} />
                ) : (
                  <LightCard padding="45px 10px">
                    <AutoColumn gap="sm" justify="center">
                      <Text style={{ textAlign: 'center' }}>You don’t have liquidity in this pool yet.</Text>
                      <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                        <Text style={{ textAlign: 'center' }}>
                          <TranslatedText translationId={100}>Add Liquidity</TranslatedText>
                        </Text>
                      </StyledInternalLink>
                    </AutoColumn>
                  </LightCard>
                )
              ) : validPairNoLiquidity ? (
                <LightCard padding="45px 10px">
                  <AutoColumn gap="sm" justify="center">
                    <Text style={{ textAlign: 'center' }}>No pool found.</Text>
                    <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                      Create pool.
                    </StyledInternalLink>
                  </AutoColumn>
                </LightCard>
              ) : pairState === PairState.INVALID ? (
                <LightCard padding="45px 10px">
                  <AutoColumn gap="sm" justify="center">
                    <Text style={{ textAlign: 'center' }}>
                      <TranslatedText translationId={136}>Invalid pair.</TranslatedText>
                    </Text>
                  </AutoColumn>
                </LightCard>
              ) : pairState === PairState.LOADING ? (
                <LightCard padding="45px 10px">
                  <AutoColumn gap="sm" justify="center">
                    <Text style={{ textAlign: 'center' }}>
                      Loading
                      <Dots />
                    </Text>
                  </AutoColumn>
                </LightCard>
              ) : null
            ) : (
              prerequisiteMessage
            )}
          </AutoColumn>

          <CurrencySearchModal
            isOpen={showSearch}
            onCurrencySelect={handleCurrencySelect}
            onDismiss={handleSearchDismiss}
            showCommonBases
            selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
          />
        </CardBody>
        </WrapperContainer>
      </AppBody>
    </PageWrapper>
  )
}
