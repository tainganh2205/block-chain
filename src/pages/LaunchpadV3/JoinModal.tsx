import React from "react";
import { BigNumber, constants } from "ethers";
import NumberFormat from "react-number-format";
import { Button } from "components/Button1";
import {
  Modal,
  ModalProps,
  ModalCloseButton,
  ModalContent,
  ModalTitle
} from "components/Modal1";
import { Text } from "components/Text";
import { IconViewTransaction } from "components/icons/components/IconViewTransaction";
import { formatBigNumber } from "utils/formatBalance";
import { noop } from "@dwarvesf/react-utils";
import { useIdoContract } from "../../hooks/useContract1";
import { useAsyncEffect } from "@dwarvesf/react-hooks";
import { useActiveWeb3React } from "../../hooks";

interface JoinModalProps extends ModalProps {
  title: string;
  label: string;
  tokenAddress: string;
  tokenSymbol: string;
  balance: BigNumber;
  staked: BigNumber;
  url: string;
  leftButtonText?: string;
  rightButtonText: string;
  rightButtonDisabled?: boolean;
  spend: number;
  setSpend: (spend: number) => void;
  hasBottom?: boolean;
  onMaxClick?: () => void;
  onSubmit?: () => void;
}

export const JoinModal = ({
                            title,
                            label,
                            tokenAddress,
                            tokenSymbol,
                            balance,
                            staked,
                            url,
                            leftButtonText = "Cancel",
                            rightButtonText,
                            rightButtonDisabled = false,
                            spend,
                            setSpend,
                            onClose,
                            hasBottom = false,
                            onMaxClick = noop,
                            onSubmit = noop,
                            ...rest
                          }: JoinModalProps) => {
  const [joinedBUSD, setJoined] = React.useState<BigNumber>(constants.Zero);
  const [maxBUSD, setMaxBUSD] = React.useState<BigNumber>(constants.Zero);
  const { account } = useActiveWeb3React();
  const idoContract = useIdoContract();

  useAsyncEffect(async () => {
    const joined = await idoContract?.userJoinedAmount(account || "") as BigNumber;
    const max = await idoContract?.userMaxAllocation(account || "") as BigNumber;
    setJoined(joined);
    setMaxBUSD(max);
  }, []);
  const leftToJoin = parseInt(formatBigNumber(maxBUSD, 3)) - parseInt(formatBigNumber(joinedBUSD, 3));
  return (
    <Modal {...rest} onClose={onClose}>
      <ModalContent className="md:px-20 max-w-[550px]">
        <ModalCloseButton />
        <div className="flex flex-col">
          <ModalTitle className="text-20 leading-normal font-bold text-center mb-6">
            {title}
          </ModalTitle>
          <div className="flex justify-between items-center mb-3">
            <Text color="white">{label}</Text>
            <Text size="sm">
              Balance: <strong className="text-primary-launchpad">{formatBigNumber(balance, 3)}{" "} {tokenSymbol}</strong>
            </Text>
          </div>
          <div className="bg-gray-600 rounded-md flex h-10 justify-between items-center w-full py-2 px-4 mb-2">
            <NumberFormat
              value={spend}
              max={leftToJoin}
              onChange={(e) => {
                setSpend(Number(e.target.value.replace(/,/g, "")));
              }}
              className="w-2/3 bg-transparent font-semibold text-gray-350 outline-none flex-1"
              thousandSeparator
              inputMode="numeric"
            />
          </div>
          <div className="flex justify-between mt-4">
            <Text size="sm">
              Staked: <strong className="text-primary-launchpad">{formatBigNumber(staked)} {tokenSymbol}</strong>
            </Text>
            <Text size="sm">
              Your BUSD left to join: <strong className="text-primary-launchpad">{leftToJoin.toFixed(1)} BUSD</strong>
            </Text>
          </div>
          <div className="flex justify-between mt-4">
            <Text size="sm">
              Your current joined: <strong className="text-primary-launchpad">{formatBigNumber(joinedBUSD, 3)} BUSD</strong>
            </Text>
            <Text size="sm">
              Maximum amount: <strong className="text-primary-launchpad">{formatBigNumber(maxBUSD, 3)} BUSD</strong>
            </Text>
          </div>
          <div className="flex justify-between mt-7">
            {hasBottom && (
              <Button
                Icon={IconViewTransaction}
                iconPosition="right"
                className="text-primary-launchpad"
                appearance="link"
                as="a"
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                Get {tokenSymbol} Token
              </Button>
            )}
            <div className="flex gap-2 items-center w-50">
              <Button
                className="w-full w-[144px]  text-primary-launchpad"
                onClick={onClose}
              >
                {leftButtonText}
              </Button>
              <Button
                onClick={onSubmit}
                disabled={rightButtonDisabled}
                className="w-full w-[144px] btn-contact text-white"
              >
                {rightButtonText}
              </Button>
            </div>
          </div>

        </div>
      </ModalContent>
    </Modal>
  );
};
