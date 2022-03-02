import React from "react";
import { CloseIcon, Text } from "@artechain/uikit";
import Modal from "../Modal";
import { PaddedColumn } from "./styleds";
import { RowBetween } from "../Row";
import TranslatedText from "../TranslatedText";
import Column from "../Column";
import { network } from "../../connectors";

interface CurrencySearchModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export default function NetworkSearchModal({
                                             isOpen,
                                             onDismiss
                                           }: CurrencySearchModalProps) {
  const arrNetwork = React.useMemo(() => {
    return [
      {
        name: "Etherium",
        icon: "/images/network/etherium.png"
      },
      {
        name: "Polygon",
        icon: "/images/network/polygon.png"
      },
      {
        name: "BSC",
        icon: "/images/network/bsc.png"
      },
      {
        name: "Avalanche",
        icon: "/images/network/avalanche.png"
      },
      {
        name: "Fantom",
        icon: "/images/network/fantom.png"
      },
      {
        name: "Cronos",
        icon: "/images/network/cronos.png"
      }
    ];
  }, []);
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={60}>
      <Column style={{ width: "100%", flex: "1 1" }}>
        <PaddedColumn gap="14px">
          <RowBetween>
            <Text className="cl-white">
              <TranslatedText translationId={82}>Select a network</TranslatedText>
            </Text>
            <CloseIcon onClick={onDismiss} />
          </RowBetween>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 15
          }}>

            {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
            {arrNetwork.map((network, index) => {
              return (
                <>
                  <span
                    style={{
                      padding: 10,
                      width: "46%",
                      textAlign: "center",
                      backgroundColor: "#272C35",
                      borderRadius: 5,
                      fontFamily: "Montserrat",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "20px",
                      letterSpacing: "0.01em",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      gap: 5
                    }}
                    key={+index}
                  >
                    <img src={network.icon} alt="" /> {network.name}
                  </span>
                </>
              );
            })}
          </div>
        </PaddedColumn>
      </Column>
    </Modal>
  );
}
