import { useDisclosure } from '@dwarvesf/react-hooks'
import { Button } from 'components/Button'
import { BigNumber } from 'ethers'
import { Text } from 'components/Text'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useLFWNFTContract, useTreasuryContract } from 'hooks/useContract'
import { useMemo, useState } from 'react'
import { wait } from 'utils/wait'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { LFW721_TOKEN_CONTRACT, TREASURY_CONTRACT } from 'constant/contracts'
import { toast } from 'components/Toast'
import { client, GET_PATHS } from 'libs'
import { HandlerGetServerResponse, ModelHeroDetail } from 'types/schema'
import {
  HeroStepTransactionModal,
  HeroStepTransactionModalProps,
} from 'components/StepTransactionModal'
import { Select, SelectOption } from 'components/Select'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useAuthContext } from 'context/auth'
import { useTransactionContext } from 'hooks/useTransactions'
import { AssetStatus } from 'types/hero'
import { handleTransactionError } from 'utils/error'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { useProfileAssetContext } from './profile-asset-context'

interface ImportAssetButtonProps {
  heroData: ModelHeroDetail
  onSuccess: () => void
}

const SeverSelect = (props: {
  value: string
  onChange: (value: string) => void
  data: HandlerGetServerResponse
}) => {
  const { value, onChange, data } = props

  const options: SelectOption[] = useMemo(() => {
    return (data?.data || []).map(({ name, id }) => ({
      text: name || '',
      value: id ? String(id) : '',
    }))
  }, [data])

  return (
    <Select
      className="w-full"
      placeholder="Select server"
      value={value}
      onChange={onChange}
      options={options}
    />
  )
}

export const ImportAssetButton = (props: ImportAssetButtonProps) => {
  const { processingStatus, setProcessingStatus } = useProfileAssetContext()
  const { heroData, onSuccess } = props
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [step, setStep] =
    useState<HeroStepTransactionModalProps['step']>('approve')
  const { walletId } = useAuthContext()
  const [validating, setValidating] = useState(false)

  const assetStatus = heroData.heroInfo?.status as AssetStatus

  const treasuryConract = useTreasuryContract()
  const lfwNFTContract = useLFWNFTContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { addTransaction } = useTransactionContext()

  const { data: servers } = useFetchWithCache(
    [GET_PATHS.profileImportServers, heroData.heroInfo?.id],
    (_, heroId) => (heroId ? client.getProfileImportServer(heroId) : null),
  )

  const [server, setServer] = useState('')

  const handleApprove = async () => {
    onOpen()

    if (processingStatus !== 'none') {
      return
    }

    try {
      const address = await lfwNFTContract?.getApproved(
        BigNumber.from(heroData.heroInfo?.tokenId),
      )
      if (address !== TREASURY_CONTRACT) {
        const approveTx = await callWithGasPrice(lfwNFTContract!.approve, [
          TREASURY_CONTRACT,
          String(heroData.heroInfo?.tokenId),
        ])
        setProcessingStatus('approving-for-importing')
        addTransaction(approveTx.hash, {
          summary: 'Approve asset',
          approval: {
            tokenAddress: LFW721_TOKEN_CONTRACT,
            spender: TREASURY_CONTRACT,
          },
        })
        const receipt = await approveTx.wait()
        if (receipt.status) {
          setStep('form-input')
        } else {
          toast.error({
            title: 'Error',
            message: ERROR_MESSAGES.TRANSACTION_ERROR,
          })
        }
        setProcessingStatus('none')
      } else {
        setStep('form-input')
        setProcessingStatus('none')
      }
    } catch (error) {
      setProcessingStatus('none')
      handleTransactionError('Approve error', error, [
        TREASURY_CONTRACT,
        String(heroData.heroInfo?.tokenId),
      ])
      onClose()
    }
  }

  const handleImport = async () => {
    if (processingStatus === 'importing' || !walletId || validating) {
      return
    }
    try {
      setValidating(true)
      await client.postCanImportAsset({
        heroId: heroData.heroInfo?.id,
        serverId: Number(server),
        walletAddress: walletId,
      })
      setValidating(false)

      setStep('processing')
      const tx = await callWithGasPrice(treasuryConract!.depositNFT, [
        LFW721_TOKEN_CONTRACT,
        BigNumber.from(heroData.heroInfo?.tokenId),
        BigNumber.from(server),
      ])
      setProcessingStatus('importing')
      addTransaction(tx.hash, {
        summary: 'Import Hero',
      })
      const receipt = await tx.wait()
      if (receipt.status) {
        await client.postImportHero({
          heroId: heroData.heroInfo?.id as string,
          serverId: parseInt(server, 10),
          walletAddress: walletId as string,
          txHash: tx.hash,
        })
        onClose()
        await wait(300)
        onSuccess()
      } else {
        setStep('form-input')
        setProcessingStatus('none')
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      setStep('form-input')
      setProcessingStatus('none')
      handleTransactionError('Import error', error)
    } finally {
      setValidating(false)
    }
  }

  return (
    <>
      <RequireSignatureHOC>
        <Button
          appearance="border-primary"
          onClick={handleApprove}
          isLoading={
            processingStatus === 'importing' ||
            processingStatus === 'approving-for-importing'
          }
          disabled={
            assetStatus === 'importing' ||
            (processingStatus !== 'none' &&
              processingStatus !== 'approving-for-importing' &&
              processingStatus !== 'importing')
          }
        >
          Import asset
        </Button>
      </RequireSignatureHOC>

      <HeroStepTransactionModal
        hero={heroData}
        isOpen={isOpen}
        onClose={onClose}
        step={step}
        steps={['Approve', 'Import asset']}
        title="Import asset"
        approveStepRender={
          processingStatus === 'approving-for-importing' ? (
            <Text
              className="sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5 text-center"
              color="white"
            >
              Approving your asset...
            </Text>
          ) : (
            <Text className="max-w-xs text-center mx-auto my-5">
              To allocate your asset, you have to approve for allocating in your
              connected wallet first. Please confirm in your connected wallet.
            </Text>
          )
        }
        formRender={
          <div className="space-y-2">
            <Text>Import asset to server</Text>
            <div className="flex sm:flex-row flex-col sm:space-x-2 sm:space-y-0 space-y-2 items-center">
              <SeverSelect
                onChange={setServer}
                value={server}
                data={servers as HandlerGetServerResponse}
              />
              <Button
                appearance="gradient"
                disabled={server === ''}
                onClick={handleImport}
                isLoading={validating}
                className="sm:w-auto w-full"
              >
                Import
              </Button>
            </div>
          </div>
        }
        processingRender={
          processingStatus === 'importing' ? (
            <Text
              className="sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5 text-center"
              color="white"
            >
              Importing your asset...
            </Text>
          ) : (
            <div className="space-y-1.5 max-w-sm text-center mx-auto my-4">
              <Text color="white" className="text-2xl">
                Waiting for Blockchain Confirmation
              </Text>
              <Text size="sm">
                Confirm this transaction in your connected wallet.
              </Text>
            </div>
          )
        }
      />
    </>
  )
}
