import { createGlobalStyle } from 'styled-components'
import {fontsSize, colors, btns} from './atoms'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: poppins_regular;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  .hiden-scrollbar::-webkit-scrollbar {
    display: none !important;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .hiden-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }

    .fw{
      width: 100%;
    }
    .mga{
      margin: auto;
    }
    .tac{
      text-align: center;
    }

    ${fontsSize}
    ${colors}
    ${btns}

    .notification {
      width: 400px !important;
    }

    .notifications-component .notification > div {
      border-left: none !important;
      background-color: #1A1E27 !important;
      border-radius: 4px !important;

      .notification__timer {
        background-color: transparent !important;
      }
      .notification__timer > div{
        background-color: transparent !important;
      }
    }
    .notifications-component .notification {
      .notification__item--warning{

        .notification__content {
          position:relative;

          &::after {
            content: '';
            position: absolute;
            height: 60px;
            width: 4px;
            background-color: #FFAF02;
            top: 50%;
            transform: translateY(-50%);
            left: 6px;
          }
        }
        .notification__title{
          color: #FFF !important;
          margin-left: 60px;
          margin-top: 5px;
        }
      }
      .notification__message {
        margin-left: 60px;
         .icon-warning {
            position: absolute !important;
           font-size: 40px;
           left: 19px;
           top: 17px;
      
          }

      }

    }

    .notifications-component .notification .success.notification__item--warning .notification__content::after {
      background-color: #16B979!important;
  }

    div[role='presentation']{
      display:none;
    }
   
  }
`

export default GlobalStyle
