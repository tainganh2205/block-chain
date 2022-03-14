import { createContext } from '@dwarvesf/react-utils'
import { useState } from 'react'

interface ContextValues {
  isStaking: boolean
  setIsStaking: (isStaking: boolean) => void
  isUnstaking: boolean
  setIsUnstaking: (isUnstaking: boolean) => void
  isHarvesting: boolean
  setIsHarvesting: (isHarvesting: boolean) => void
  isWithdrawing: boolean
  setIsWithdrawing: (isHarvesting: boolean) => void
}

const [Provider, useStakeContext] = createContext<ContextValues>()

export const StakeContextProvider: React.FC<any> = ({ children }) => {
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)
  const [isHarvesting, setIsHarvesting] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  return (
    <Provider
      value={{
        isStaking,
        setIsStaking,
        isUnstaking,
        setIsUnstaking,
        isHarvesting,
        setIsHarvesting,
        isWithdrawing,
        setIsWithdrawing,
      }}
    >
      {children}
    </Provider>
  )
}

export { useStakeContext }
