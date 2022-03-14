import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'components/Modal'
import { StepIndicator } from 'components/StepIndicator'
import { Transition } from '@headlessui/react'

export interface BuyStepTransactionModalProps
  extends Omit<ModalProps, 'children'> {
  steps: string[]
  title: string
  approveStepRender: React.ReactNode
  processingRender: React.ReactNode
  step: 'approve' | 'processing'
}

export const BuyStepTransactionModal = (
  props: BuyStepTransactionModalProps,
) => {
  const {
    isOpen,
    onClose,
    steps,
    title,
    step = 'approve',
    approveStepRender,
    processingRender,
  } = props

  const current = step === 'approve' ? 0 : 1

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalContent className="relative max-h-screen md:min-w-[720px] sm:mx-4 py-10 sm:!px-14 !px-4 overflow-auto sm:overflow-visible">
        <ModalCloseButton />
        <ModalTitle className="text-2xl sm:text-[32px] font-bold text-gray-100 mb-8 text-center">
          {title}
        </ModalTitle>
        {steps.length > 1 && (
          <div className="text-center">
            <StepIndicator steps={steps} current={current} />
          </div>
        )}

        <Transition show={step === 'approve'} leave="hidden">
          <div>
            <video
              className="block mx-auto w-[280px] h-[243px]"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/video/loading.webm" type="video/webm" />
              <source src="/video/loading.mp4" type="video/mp4" />
            </video>
            {approveStepRender}
          </div>
        </Transition>
        <Transition
          show={step === 'processing'}
          enter="transition duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="hidden"
          className="transition"
        >
          <div>
            <video
              className="block mx-auto w-[280px] h-[243px]"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/video/loading.webm" type="video/webm" />
              <source src="/video/loading.mp4" type="video/mp4" />
            </video>
            {processingRender}
          </div>
        </Transition>
      </ModalContent>
    </Modal>
  )
}
