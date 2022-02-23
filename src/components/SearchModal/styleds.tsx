import styled from 'styled-components'
import { AutoColumn } from '../Column'
import { RowBetween, RowFixed } from '../Row'

export const FadedSpan = styled(RowFixed)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
`

export const PaddedColumn = styled(AutoColumn)`
  padding: 20px;
  padding-bottom: 12px;
`

export const MenuItem = styled(RowBetween)`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto minmax(0, 72px);
  grid-gap: 16px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  :hover {
    background-color: ${({ theme, disabled }) => !disabled && theme.colors.invertedContrast};
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
`

export const SearchInput = styled.input`
  background: #15181e;
  border: 1px solid #454545;
  box-sizing: border-box;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  &::placeholder {
    color: #808982;
    font-weight: 500;
    font-size: 14px;
  }
  &:focus {
    background-color: #15181e !important;
    border: 1px solid #454545 !important;
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25) !important;
    border-radius: 10px !important;
  }

  position: relative;
  display: flex;
  padding: 10px;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  /* border: none; */
  outline: none;
  /* border-radius: 10px; */
  /* color: ${({ theme }) => theme.colors.text}; */
  border-style: solid;
  /* border: 1px solid ${({ theme }) => theme.colors.tertiary}; */
  -webkit-appearance: none;
  background: #1c1b1b;
  /* border: 1px solid #1C1B1B; */

  font-size: 18px;

  /* ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  } */
  transition: border 100ms;
  /* :focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    outline: none;
  } */
`
export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.invertedContrast};
`

export const SeparatorDark = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.tertiary};
`
