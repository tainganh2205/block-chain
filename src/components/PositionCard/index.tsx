import React, { useState } from 'react'
import { JSBI, Pair, Percent } from '@artechain/sdk'
import { Button, Card as UIKitCard, CardBody, Text } from '@artechain/uikit'
import { darken } from 'polished'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTotalSupply } from '../../data/TotalSupply'

import { useActiveWeb3React } from '../../hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import Card from '../Card'
import { AutoColumn } from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween, RowFixed } from '../Row'
import { Dots } from '../swap/styleds'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const HoverCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.invertedContrast};
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.colors.invertedContrast)};
  }
`

const UIKitCardBody = styled(UIKitCard)`
  background: #1C3C38;
  border-radius: 10px;
`

const BoxImg = styled.div`
  background: #121517;
  border-radius: 4px;
  padding: 5px 8px;
  display: inline-block;
  cursor: pointer;
`

interface PositionCardProps {
  pair: Pair
  // eslint-disable-next-line react/no-unused-prop-types
  showUnwrapped?: boolean
}

export function MinimalPositionCard({ pair, showUnwrapped = false }: PositionCardProps) {
  const { account } = useActiveWeb3React()
  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

      const [overPrice, setOverPrice] = React.useState<boolean>(true)

  return (
    <>
      {userPoolBalance && (
        <>
        <Text
            style={{ textTransform: 'uppercase', fontWeight: 600, display:'flex', justifyContent:'space-between', alignItems: 'center' }}
            color="textSubtle"
            fontSize="12px"
            mb="5px"
          >
            LP Tokens in your Wallet
            <BoxImg className="box-img" onClick={() => setOverPrice(prevOverPrice => !prevOverPrice)}>
              {!overPrice ?  <img src="/images/imagesSwap/chevron-down.png" alt="" /> : <img src="/images/imagesSwap/chevron-up.png" alt="" />}
            </BoxImg>
          </Text>
          {
            overPrice && (
              <UIKitCardBody className='minimal-position-card'>
              <CardBody>
                <AutoColumn gap="12px">
                  <FixedHeightRow onClick={() => setShowMore(!showMore)}>
                    <RowFixed>
                      <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={20} />
                      <Text fontSize="14px" className='cl-white fw-bold'>
                        {currency0.symbol}/{currency1.symbol}
                      </Text>
                    </RowFixed>
                    <RowFixed>
                      <Text className='cl-white fw-bold' fontSize="14px">{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</Text>
                    </RowFixed>
                  </FixedHeightRow>
                  <AutoColumn gap="4px">
                    <FixedHeightRow>
                      <Text className='cl-white fw-bold' fontSize="14px">{currency0.symbol}:</Text>
                      {token0Deposited ? (
                        <RowFixed>
                          <Text className='cl-white fw-bold' ml="6px" fontSize="14px">
                            {token0Deposited?.toSignificant(6)}
                          </Text>
                        </RowFixed>
                      ) : (
                        '-'
                      )}
                    </FixedHeightRow>
                    <FixedHeightRow>
                      <Text className='cl-white fw-bold' fontSize="14px">{currency1.symbol}:</Text>
                      {token1Deposited ? (
                        <RowFixed>
                          <Text className='cl-white fw-bold' ml="6px" fontSize="14px">
                            {token1Deposited?.toSignificant(6)}
                          </Text>
                        </RowFixed>
                      ) : (
                        '-'
                      )}
                    </FixedHeightRow>
                  </AutoColumn>
                </AutoColumn>
              </CardBody>
            </UIKitCardBody>
            )
          }
        </>
      )}
    </>
  )
}

export default function FullPositionCard({ pair }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <HoverCard>
      <AutoColumn gap="12px">
        <FixedHeightRow onClick={() => setShowMore(!showMore)} style={{ cursor: 'pointer' }}>
          <RowFixed>
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={20} />
            <Text className='cl-white'>{!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol}/${currency1.symbol}`}</Text>
          </RowFixed>
          <RowFixed>
            {showMore ? (
              <ChevronUp size="20" style={{ marginLeft: '10px' }} />
            ) : (
              <ChevronDown size="20" style={{ marginLeft: '10px' }} />
            )}
          </RowFixed>
        </FixedHeightRow>
        {showMore && (
          <AutoColumn gap="8px">
            <FixedHeightRow>
              <RowFixed>
                <Text className='cl-white'>Pooled {currency0.symbol}:</Text>
              </RowFixed>
              {token0Deposited ? (
                <RowFixed>
                  <Text className='cl-white' ml="6px">{token0Deposited?.toSignificant(6)}</Text>
                  <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={currency0} />
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>

            <FixedHeightRow>
              <RowFixed>
                <Text>Pooled {currency1.symbol}:</Text>
              </RowFixed>
              {token1Deposited ? (
                <RowFixed>
                  <Text className='cl-white' ml="6px">{token1Deposited?.toSignificant(6)}</Text>
                  <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={currency1} />
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>
            <FixedHeightRow>
              <Text>Your pool tokens:</Text>
              <Text>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</Text>
            </FixedHeightRow>
            <FixedHeightRow>
              <Text className='cl-white'>Your pool share:</Text>
              <Text className='cl-white'>{poolTokenPercentage ? `${poolTokenPercentage.toFixed(2)}%` : '-'}</Text>
            </FixedHeightRow>

            <RowBetween marginTop="10px">
              <Button as={Link} to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`} style={{ width: '48%' }}>
                Add
              </Button>
              <Button
                as={Link}
                style={{ width: '48%' }}
                to={`/remove/${currencyId(currency0)}/${currencyId(currency1)}`}
              >
                Remove
              </Button>
            </RowBetween>
          </AutoColumn>
        )}
      </AutoColumn>
    </HoverCard>
  )
}
