import React, { useState, useCallback } from 'react'
import { Currency, Pair } from '@artechain/sdk'
import { Button, ChevronDownIcon, Text } from '@artechain/uikit'
import styled from 'styled-components'
import { darken } from 'polished'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween } from '../Row'
import { Input as NumericalInput } from '../NumericalInput'
import { useActiveWeb3React } from '../../hooks'
import TranslatedText from "../TranslatedText"
import { TranslateString } from '../../utils/translateTextHelpers'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 34px;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
  color: ${({ selected, theme }) => (selected ? theme.colors.text : '#FFFFFF')};
  /* border-radius: 12px; */
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.7rem;

  :focus,
  :hover {
    background: #272C35;
    box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.colors.textSubtle)};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  /* border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')}; */
  /* background-color: ${({ theme }) => theme.colors.background}; */
  z-index: 1;
  background-color: #15181E;
  border-radius: 10px;
  border: 1px solid #575757;
  box-sizing: border-box;
  box-shadow: inset 0px 0px 11px rgba(0, 0, 0, 0.49);
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 16px;
  /* background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset}; */
  background-color: #15181E;
  /* border: 1px solid #504E4B; */

  .btn-max{
    color: #55C595;
    background: #272C35;
    border-radius: 10px;
    height: 32px;
    padding: 0px 12px;

  }

  .box-form-title{
    font-size: 14px;
    line-height: 17px;

    letter-spacing: 0.01em;

    color: #909090;
  }
  .box-form-pair{
    color: #FFFFFF;
  }
  .chevron-icon path{
    fill: #808982;
  }
  .token-amount-input{
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.01em;
    color: #FFFFFF;
    &::placeholder {
      color: #FFFFFF;
    }
  }
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = TranslateString(132, 'Input'),
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases
}: CurrencyInputPanelProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <Text className='box-form-title' fontSize="14px">{label}</Text>
              {account && (
                <Text className='cl-gray' onClick={onMax} fontSize="14px" style={{ display: 'inline', cursor: 'pointer' }}>
                  {!hideBalance && !!currency && selectedCurrencyBalance
                    ? `Balance: ${  selectedCurrencyBalance?.toSignificant(6)}`
                    : ' -'}
                </Text>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={val => {
                  onUserInput(val)
                }}
              />
              {account && currency && showMaxButton && label !== 'To' && (
                <Button onClick={onMax} size="sm" variant="text" className='btn-max' style={{marginRight:'0.5rem'}}>
                  MAX
                </Button>
              )}
            </>
          )}
          <CurrencySelect
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                setModalOpen(true)
              }
            }}
          >
            <Aligner>
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
              ) : null}
              {pair ? (
                <Text id="pair" className='box-form-pair'>
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair" className='box-form-pair' paddingRight="5px">
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4) 
                      }...${ 
                      currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)}`
                    : currency?.symbol) || <TranslatedText translationId={82}>Select a currency</TranslatedText>}
                </Text>
              )}
              {!disableCurrencySelect && <img src="/images/imagesSwap/arrow-down-token2.png" alt="" />}
            </Aligner>
          </CurrencySelect>
        </InputRow>
      </Container>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </InputPanel>
  )
}
