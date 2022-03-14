import { createContext } from '@dwarvesf/react-utils'
import { useState } from 'react'

export type ProcessingStatus =
  | 'none'
  | 'transfering'
  | 'selling'
  | 'buying'
  | 'minting'
  | 'importing'
  | 'approving-for-importing'
  | 'approving-for-selling'
  | 'approving-for-buying'
  | 'unlisting'
  | 'withdrawing'
  | 'updating-price'

interface ProfileAssetContextValues {
  processingStatus: ProcessingStatus
  setProcessingStatus: (status: ProcessingStatus) => void
}

const [Provider, useProfileAssetContext] =
  createContext<ProfileAssetContextValues>()

const ProfileAssetContextProvider: React.FC = ({ children }) => {
  const [processingStatus, setProcessingStatus] =
    useState<ProcessingStatus>('none')

  return (
    <Provider value={{ processingStatus, setProcessingStatus }}>
      {children}
    </Provider>
  )
}

export { useProfileAssetContext, ProfileAssetContextProvider }
