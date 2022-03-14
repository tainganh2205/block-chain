/* eslint-disable react/jsx-no-useless-fragment */
import { ComingSoon } from 'components/ComingSoon'
import { IS_STAGING } from 'constant/env'
import { useAuthContext } from 'context/auth'
import React from 'react'

export function useEnableForCloseBeta() {
  const { walletId } = useAuthContext()

  return !(IS_STAGING && !whitelist.includes(walletId as string))
}

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
  showComingSoon?: boolean
}

const whitelist = [
  '0x04aACbeFF4D4272bC9baB0feBD9EA33fd5571093',
  '0x517e608e63fC547110F11543411f94A596dB5579',
  '0xfdfb16ffaF364A4ae15DB843ae18a76fD848E79E',
  '0x0F718f4d2feE11E6a78310C39E159d814dd6c6f8',
  '0x9582a0Be207b4cd897ae7DC6C5c979B1b0AC71bd',
  '0x58e480B953FD041c11b29353A1e3272253910828',
  '0xA97924b439d296fca9b1D738689B8Bee139d80c0',

  // Game team whitelist
  '0xD5a2250421c1388FDCd0F0A2d3F3b121F4f30495',
  '0x87518B860F10E46Ddd287CECa30603E0E43845B7',
  '0xEf26c7c4a88BAa38D7670940710f713C73596016',
  '0x2AAb838991FB6F32F6431aaa7CFB3d55d50fBFf0',
  '0x4e9cC4DBa753B8d050c2887A3d40288c395C19c2',
  '0x7a8fe0B73c2A1C8574Fc17C310F9d238e1B390D8',
  '0xC1AAE02E2aad56a0F3B682B7785133b5f021a068',
  '0x718e4B54708D06ee0E6Ac4Ebaa735E2dE0F1AA90',
  '0x8B0adC9Ee3E0c4A82702522FaE85eD8f876DA246',
  '0xf60d792f020a08Ad5de08693DbA96525b0808A09',
  '0x3e8226BFe2eDe7DADc40EeCE75F22582b94a26D2',
  '0x49d3a280714f2D75904ced8CbD2476e7d28Ef951',
  '0x51d89Dac8f3f95DCCbDD2ea7B0975Da87a94f7a6',
  '0x56aA56615A100aA7822e495C098033979D113F80',
  '0xfED9559BFc1cC7c4410A3Be256c39BC9c1A14A90',
  '0x95AB11E5442b39E9890eA0d2D4EDA61F5384E9cD',
  '0x51d89Dac8f3f95DCCbDD2ea7B0975Da87a94f7a6',
  '0xAfBA6bd9681124f4BFbAfF2dE86d5Ff5E157A657',
  '0xC1AAE02E2aad56a0F3B682B7785133b5f021a068',
]

export function NonCloseBetaRender(props: Props) {
  const {
    children,
    showComingSoon = false,
    fallback = showComingSoon ? <ComingSoon className="!p-0" /> : null,
  } = props

  const enabled = useEnableForCloseBeta()

  if (!enabled) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
