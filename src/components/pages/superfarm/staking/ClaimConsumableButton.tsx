import React, { useState } from 'react'
import { Button } from 'components/Button'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalTitle,
} from 'components/Modal'
import { Text } from 'components/Text'
import { toast } from 'components/Toast'
import { handleTransactionError } from 'utils/error'
import { constants } from 'ethers'
import { useConstant, useDisclosure } from '@dwarvesf/react-hooks'
import { useRouter } from 'next/router'
import cx from 'classnames'
import { noop } from '@dwarvesf/react-utils'
import { SeverSelect } from '../../../SeverSelect'
import { getDefaultValues } from '../ListHero'
import { useIsMobile } from '../../../../hooks/useIsMobile'
import { client } from '../../../../libs'

interface ClaimButtonProps {
  isDisabled: boolean
  isRefresh: boolean
  type: string
  setIsRefresh: (isRefresh: boolean) => void
  onSuccess: () => void
}

export default function ClaimConsumableButton({
  isDisabled,
  setIsRefresh,
  isRefresh,
  type,
  onSuccess = noop,
}: ClaimButtonProps) {
  const isMobile = useIsMobile()
  const { asPath } = useRouter()
  const defaultParams = useConstant(getDefaultValues(asPath))
  const [loading, setLoading] = useState(false)
  const [server, setServer] = useState<string>(defaultParams.server)
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()

  const handleClaim = async () => {
    setLoading(true)
    try {
      await client.claimSuperFarm({
        campaign: '1',
        claimItem: type,
        gameServerId: +server,
      })
      setIsRefresh(!isRefresh)
      onSuccess()
      setLoading(false)
      toast({
        status: 'success',
        title: 'Claim Successfully!',
        message: (
          <div className="text-green-500">
            Please check your claimed items in game.
          </div>
        ),
        duration: 5000,
      })
    } catch (error) {
      handleTransactionError('Claim error', error, [constants.Zero])
      setLoading(false)
    } finally {
      onConfirmClose()
    }
  }

  return (
    <>
      <Button
        className={cx('mt-2 mb-2 mx-auto', {
          'w-[100px]': !isMobile,
          'w-[80px]': isMobile,
        })}
        onClick={onConfirmOpen}
        disabled={isDisabled}
      >
        Claim
      </Button>
      <Modal isOpen={isConfirmOpen} onClose={onConfirmClose}>
        <ModalContent className="md:px-20 max-w-[470px]">
          <ModalCloseButton />
          <div className="flex flex-col">
            <ModalTitle className="text-32 leading-normal font-bold text-center mb-6">
              Claim {type === 'consumable' ? '10 Game Items' : '1 NFT LEGACY N'}
            </ModalTitle>
            <div className="flex justify-between items-center mb-3">
              <Text as="span" color="white">
                Server
              </Text>
              <SeverSelect
                className="xl:w-44"
                value={server}
                onChange={setServer}
                hasAll
              />
            </div>
            <div className="flex justify-between mt-7">
              <Button onClick={onConfirmClose} className="w-full max-w-[144px]">
                Cancel
              </Button>
              <Button
                className="w-full max-w-[144px]"
                isLoading={loading}
                disabled={loading || !server}
                onClick={handleClaim}
              >
                Claim
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
