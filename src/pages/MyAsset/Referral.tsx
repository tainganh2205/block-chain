import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { PageWrapper } from "../App";

interface InviteUser {
  wallet: string,
  status: string
}

const Referral = () => {
  const [invitedUsers, setInvitedUsers] = useState<Array<InviteUser>>();

  useEffect(() => {
    // setTimeout(() => setInvitedUsers([]), 1000);
    setTimeout(() => setInvitedUsers([
      {
        wallet: "0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B",
        status: "Pending"
      },
      {
        wallet: "0xCfE2cd1e76Ef398B137f9eC8031B87982e18E4AC",
        status: "Activated"
      },
      {
        wallet: "0x364643Ab982122ca603Ec367CF3DDc920a5B61cD",
        status: "Activated"
      },
      {
        wallet: "0x92C38961f55a0E9e3376401162fB642b112f8259",
        status: "Activated"
      },
      {
        wallet: "0x364643Ab982122ca603Ec367CF3DDc920a5B61cD",
        status: "Activated"
      },
      {
        wallet: "0x92C38961f55a0E9e3376401162fB642b112f8259",
        status: "Activated"
      }
    ]), 1000);
  }, []);

  return (
    <PageWrapper className="PageWrapper relative d-flex items-center justify-center">
      <Wrapper className={"h-full d-flex items-center justify-center"}>
        <CardDiv className={"mr-4 d-flex flex-column"} width={413} imgUrl={"/images/fish/box-full-blue.png"} padding={25}>
          <TitleH2>Invited friends</TitleH2>
          <TableWrap>
            <InviteTable>
              <thead>
              <tr>
                <th>
                  WALLET
                </th>
                <th>
                  ACTIVE STATUS
                </th>
              </tr>
              </thead>
              <tbody>
              {(invitedUsers || []).map((user, index) => <tr key={index}>
                <td title={user.wallet}>{user.wallet}</td>
                <td className={user.status}>{user.status}</td>
              </tr>)}
              </tbody>
            </InviteTable>
            {(Array.isArray(invitedUsers) && !invitedUsers.length) && <div className={"h-full d-flex items-center justify-center"}>
              <img src={"/images/fish/empty.png"} alt={""} />
            </div>}
          </TableWrap>
        </CardDiv>
        <CardDiv className={"d-flex flex-column"} width={846} imgUrl={"/images/fish/box-referral.png"} padding={50}>
          <TitleH2>Referral Earned</TitleH2>
          <TableWrap>
            <ReferralTable>
              <thead>
              <tr>
                <th>
                  ACTIVE FRIENDS
                </th>
                <th>
                  TRANSACTIONS
                </th>
                <th>
                  AMOUNT
                </th>
                <th>
                  YOU WILL GET
                </th>
                <th>
                  DATE
                </th>
                <th>
                  STATUS
                </th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </ReferralTable>
            <div className={"h-full d-flex items-center justify-center"}>
              <img src={"/images/fish/empty.png"} alt={""} />
            </div>
          </TableWrap>
        </CardDiv>
      </Wrapper>
    </PageWrapper>
  );
};

const Wrapper = styled.div`
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const CardDiv = styled.div<{ width: number, imgUrl: string, padding: number }>`
  width: ${({ width }) => width}px;
  height: 314px;
  position: relative;
  padding: 30px ${({ padding }) => padding}px;
  margin: 12px 0;

  > * {
    position: relative;
    z-index: 1;
  }

  :before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: ${({ width }) => width}px;
    height: 314px;
    opacity: .5;
    background-image: url("${({ imgUrl }) => imgUrl}");
    background-size: ${({ width }) => width}px 314px;
    background-repeat: no-repeat;
  }
`;

const TitleH2 = styled.h2`
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #FFFDFD;
  margin-bottom: 24px;
`;

const TableWrap = styled.div`
  flex: 1;
  max-height: 210px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-right: -15px;
`;

const InviteTable = styled.table`
  width: 100%;

  th, td {
    font-weight: 500;
    font-size: 14px;
    line-height: 40px;

    &:first-child {
      max-width: 270px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:last-child {
      white-space: nowrap;
      text-align: center;
    }
  }

  th {
    color: #28EBA8;
  }

  td {
    color: #FFFDFD;
    border-bottom: 1px rgba(219, 219, 219, 0.2) solid;

    &.Pending {
      color: #ECD35E;
    }

    &.Activated {
      color: #35eb28;
    }
  }
`;

const ReferralTable = styled.table`
  width: 100%;

  th, td {
    font-weight: 500;
    font-size: 14px;
    line-height: 40px;
    color: #FFFDFD;
  }
`;

export default Referral;
