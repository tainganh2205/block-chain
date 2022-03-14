import React, { useState } from 'react'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalTitle,
} from 'components/Modal'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import CheckboxGroup from 'components/CheckboxGroup'
import { Select } from 'components/Select'

export interface DisclaimerProps {
  isOpen: boolean
  onClose: () => void
}

const options: { text: string; value: string }[] = [
  {
    text: 'Vietnam',
    value: 'vietnam',
  },
]

export const DisclaimerPopUpModal = (props: DisclaimerProps) => {
  const { isOpen, onClose } = props
  const [country, setCountry] = useState('Viet Nam')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="max-w-[794px] max-h-[631px] xl:max-h-full bg-[#14232F] overflow-auto no-scrollbar">
        <ModalCloseButton />
        <ModalTitle className="text-2xl font-semibold text-center">
          Just a sec!
        </ModalTitle>
        <Text color="white" className="mb-4 mt-7 font-bold">
          By entering to this website and/or using our Services, you hereby
          agree, represent and warrant:
        </Text>
        <ul className="text-left text-white opacity-70 list-disc list-inside space-y-4 ml-3">
          <li>
            You will be solely responsible to proceed at your own discretion.
          </li>
          <li>
            You are not using, and will not in the future use, a VPN to mask
            your physical location from a restricted location.
          </li>
          <li>
            You are responsible for ensuring compliance with the laws of your
            jurisdiction in connections with your use of the our Services.
          </li>
          <li>
            You understand that ZombieWorldZ is not liable for your compliance
            or non-compliance with any such laws.
          </li>
        </ul>
        <Text color="white" className="my-4 font-bold">
          Please confirm that you are not a citizen or permanent resident of,
          you do not have a primary residence in, and you are not physically
          located in the following territories or possessions:
        </Text>
        <ul className="text-left text-white opacity-70 list-disc list-inside ml-3">
          <li>
            United States of America, Albania, Barbados, Burkina Faso, Balkans,
            Belarus, Cambodia, Cayman Islands, Cote D'Ivoire (Ivory Coast),
            Cuba, Democratic Republic of Congo, Haiti, Jamaica, Malta, Morocco,
            Myanmar, Nicaragua, Pakistan, Panama, Senegal, South Sudan, Syria,
            Uganda, Yemen, Zimbabwe, Iran, Iraq, Liberia, Democratic People's
            Republic of Korea (DPRK), Jordan, Mali, People’s Republic of China,
            Hong Kong SAR, Macau SAR and Turkey.
          </li>
        </ul>
        <CheckboxGroup className="my-7 space-y-4 overflow-auto">
          <Checkbox value="1">
            I declare that I am NOT a resident of the prohibited territories or
            possessions as listed above.
          </Checkbox>
          <Checkbox value="2">
            I have read, understood, and agree with the{' '}
            <a
              href="https://docs.legendfantasywar.com/privacy-policy"
              target="_blank"
              className="text-primary"
              rel="noreferrer"
            >
              Privacy Policy
            </a>{' '}
            and the{' '}
            <a
              href="https://docs.legendfantasywar.com/terms-of-service"
              target="_blank"
              className="text-primary"
              rel="noreferrer"
            >
              Term of Service
            </a>
            .
          </Checkbox>
          <Checkbox value="3">
            I declare that I am a resident of{' '}
            <Select
              className="md:ml-4 bg-[#1C3241]"
              placeholder="Vietnam"
              value={country}
              onChange={setCountry}
              options={options}
            />
          </Checkbox>
        </CheckboxGroup>
        <div className="flex justify-center space-x-5">
          <Button appearance="border-primary" className="w-[153px]">
            Nevermind
          </Button>
          <Button className="w-[153px]" appearance="gradient">
            Confirm
          </Button>
        </div>
      </ModalContent>
    </Modal>
  )
}
