import { css } from "styled-components";

export const fontsSize = css`
    .sz-12{
      font-size: 12px;
    }
   .sz-14{
      font-size: 14px;
    }

    .sz-18{
      font-size: 18px;
    }
    .fw-bold{
      font-weight: bold;
    }

    .fw-500{
      font-weight: 500;
    }

`;

export const colors = css`
   *[color='text']{
      color: white;
    }

    *[color='textSubtle']{
      color: #808982;
    }

    svg[color='textSubtle']{
      fill: #808982;
    }
    
    .cl-white{
      color: white;
    }

    .cl-primary{
      color: #16B979;
    }

    .cl-light-primary{
      color: #30FFAE;
    }

    .cl-yel{
      color: #F5DE05;
    }
    
    .cl-gray{
      color: #808982;
    }

    .cl-disable-primary{
      color: #fff;
      background-color: #16B979;
      opacity: 0.5;
    }

`;

export const btnPrimary = css`
  background-color: #16b979;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  transition: all 0.1s;
  &[disabled] {
    color: #b1b1b1;
    background-color: #393f4a;
  }

  &[disabledNew] {
    color: #fff;
    background-color: #16B979;
  }

  &[disabled]&[data-disable='primary'] {
    color: #fff;
    background-color: #16b979;
    opacity: 0.2;
  }

  &[data-variant='tertiary'], &[variant='tertiary'] {
    background-color: rgba(19, 200, 90, 0.1);
    color: #30ffae;
  }

  &[data-variant='danger'], &[variant='danger'] {
    background-color: #D64949;
    color: #fff;
  }

  /* &:focus, */
  &:hover,
  &:active {
    box-shadow: none !important;
    border-color: #0B6B45;
    background-color: #0B6B45 !important;
    border-radius: 8px;
    font-weight: 600;
    color: #B4B4B4 !important;
    &[disabled] {
      color: #b1b1b1;
      background-color: #393f4a !important;
    }
    &[disabled]&[data-disable='primary'] {
      color: #fff;
      background-color: #16b979 !important;
      opacity: 0.2;
    }
    &[data-variant='tertiary'], &[variant='tertiary'] {
      background-color: rgba(116, 255, 170, 0.18) !important;
      color: #30ffae !important;
    }
  }
`

export const btnYel = css`
  background-color: #16b979;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  transition: all 0.1s;
  &[disabled] {
    color: #b1b1b1;
    background-color: #393f4a;
  }
  &[disabled]&[data-disable='primary'] {
    color: #fff;
    background-color: #16b979;
    opacity: 0.2;
  }
  &[data-variant='tertiary'] {
    /* background-color: rgba(19, 200, 90, 0.1); */
    color: #F5DE05;
    background: rgba(245, 222, 5, 0.1);
    box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.05);
  }
  /* &:focus, */
  &:hover,
  &:active {
    box-shadow: none !important;
    &[disabled] {
      color: #b1b1b1;
      background-color: #393f4a !important;
    }
    &[disabled]&[data-disable='primary'] {
      color: #fff;
      background-color: #16b979 !important;
      opacity: 0.2;
    }
    &[data-variant='tertiary'] {
      opacity: 0.5 !important;
    }
  }
`

export const inputCss = css`
  background-color: #15181e !important;
  border: 1px solid #454545 !important;
  box-sizing: border-box;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 8px !important;
  color: white !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  &::placeholder {
    color: #808982 !important;
    font-weight: 500 !important;
    font-size: 14px !important;
  }
  &:focus {
    color: white !important;
    background-color: #272c35 !important;
    border: 0.75px solid #16b979 !important;
    box-shadow: inset 0px 0px 4px rgba(22, 185, 121, 0.27) !important;
  }
`

export const btns = css`
    .btn-art-primary{
        ${btnPrimary}
    }

    .select-art, .area-art,.ant-select-selector, .input-art{
      ${inputCss}
    }

    .ant-art {
      &:focus{
        .ant-select-selector{
          height: 100% !important;
          align-items: center;
          color: white !important;
          background-color: #272c35 !important;
          border: 0.75px solid #16b979 !important;
          box-shadow: inset 0px 0px 4px rgba(22, 185, 121, 0.27) !important;
        }
      }
      .ant-select-selector{
        height: 100% !important;
        align-items: center;
      }
    }

    .ant-select-arrow{
      color: #808982 !important;
    }
    .ant-select-dropdown{
      background-color: #1E1F28 !important;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04) !important;
      border-radius: 6px !important;
    }
    .ant-select-item{
      font-weight: 500 !important;
      font-size: 16px !important;
      line-height: 20px !important;
      /* identical to box height */

      letter-spacing: 0.01em !important;

      color: #B8BDB9 !important;
      &:hover{
        border-radius: 6px !important;
        background-color: #272C35 !important;
      }
    }
    
    .ant-select-item-option-active:not(.ant-select-item-option-disabled), .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
        background-color: #272C35 !important;
        border-radius: 6px !important;
    }


`