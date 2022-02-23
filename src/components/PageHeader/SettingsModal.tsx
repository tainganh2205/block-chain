import { Modal } from '@artechain/uikit'
import { WrapperModal } from 'components/Art'
import React from 'react'
import SlippageToleranceSetting from './SlippageToleranceSetting'
import TransactionDeadlineSetting from './TransactionDeadlineSetting'

type SettingsModalProps = {
  onDismiss?: () => void
}

const defaultOnDismiss = () => null

const SettingsModal = ({ onDismiss = defaultOnDismiss }: SettingsModalProps) => {
  return (
    <WrapperModal>
      <Modal title="Settings" onDismiss={onDismiss}>
        <span style={{border:'1px'}} />
        <SlippageToleranceSetting />
        <TransactionDeadlineSetting />
      </Modal>
    </WrapperModal>
  )
}

export default SettingsModal
