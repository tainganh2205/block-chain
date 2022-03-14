import React, {ReactNode} from 'react'
import Modal from 'react-modal'
import {Store} from 'react-notifications-component'
import {ButtonArt} from 'components/Art'
import styled from 'styled-components'
import {Heading, Text, Flex} from '@artechain/uikit'
import {useHookUpload} from './Store-Upload'
import {useActiveWeb3React} from '../../hooks'


interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
}

const StyledPageHeader = styled.div`
  /* padding-left: 40px;
  padding-right: 40px; */
  padding-left: 33px;
  padding-right: 33px;

  .container-header {
    padding-bottom: 12px;
    padding-top: 20px;
    border-bottom: 1px solid ${({theme}) => theme.colors.borderColor};

    .labelName:hover {
      color: #05D8F5;
      cursor: pointer;
    }
  }
`
const Details = styled.div`
  flex: 1;
`

const Header = ({title, description}: PageHeaderProps) => {
  const [state, actions] = useHookUpload()
  const {account} = useActiveWeb3React()
  return (
    <StyledPageHeader>
      <div className='container-header'>
        <Flex alignItems="center">
          <Details>
            <Heading className='customTitle'>{title}</Heading>
            {description && (
              <Text color="textSubtle" fontSize="14px" fontWeight="bold" mt="8px">
                {description}
              </Text>
            )}
          </Details>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          {!state.objData.artistName ? (
            <div className="labelName">
              <>
                {account === null ? (
                  <ButtonArt data-variant='tertiary' variant='tertiary' type="button" onClick={() =>
                    Store.addNotification({
                      title: 'Warning !',
                      message: (
                        <div className="custom-fontsize">
                          <i className="fa fa-exclamation-triangle icon-warning" aria-hidden="true"/> Please Unlock
                          Wallet!
                        </div>
                      ),
                      type: 'warning',
                      width: 300,
                      insert: 'top',
                      container: 'top-center',
                      animationIn: ['animate__animated', 'animate__fadeIn'],
                      animationOut: ['animate__animated', 'animate__fadeOut'],
                      dismiss: {
                        duration: 2000,
                        onScreen: true,
                        pauseOnHover: true,
                        click: true,
                        touch: true,
                      },
                    })
                  } className="btn-Create">
                    {/* Create artists */}
                    Activate Profile
                  </ButtonArt>
                ) : (
                  <a href="#/createArtists" className="btn-art-primary" data-variant='tertiary'
                     style={{height: '50px', padding: '0px 24px', display: 'inline-flex', alignItems: 'center', fontWeight: 500}}>
                    {/* Create artists */}
                    Activate Profile
                  </a>
                )}
              </>
            </div>
          ) : (
            <a href='#/collections'>
              <label className="labelName cl-primary" htmlFor="nameInput">
                {state.objData.artistName ? `${state.objData.artistName}` : ''}
              </label>
            </a>
          )}
        </Flex>
      </div>
    </StyledPageHeader>
  )
}

export default Header
