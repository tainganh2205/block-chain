import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Player, ControlBar } from "video-react";

import "video-react/dist/video-react.css";

import { ReactComponent as Icon1 } from "../../images/img/comming soon.svg";

const GIntroduction: any[] = [
  {
    label: "Introduction",
    title:
      "“Legend of Galaxy” is a passing game with card role-playing; Players will have the opportunity to recruit more than 100 characters and build the most powerful ",
    video: "video"
  }
];
const Wrapper = styled.div`
  width: 100%;

  .slick-dots {
    position: relative;
    cursor: pointer !important;
  }

  .tw {
    color: #fff !important;
  }

  .f-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .column {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-wrap: wrap;
    margin: -15px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .w-33 {
    width: calc(4 / 12 * 100%);
    padding: 15px;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .h__Introduction {
    margin: 40px 0 0px 0;

    h1 {
      font-size: 34px;
      line-height: 29px;
      letter-spacing: 0.01em;
      font-weight: 500;
      position: relative;

      @media (max-width: 416px) {
        font-size: 30px;
      }

      &:before {
        position: absolute;
        content: '';
        width: 124px;
        height: 4px;
        background: #169CE7;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    p {
      display: inline-flex;
      max-width: 565px;
      text-align: center;
      color: #b8bdb9a8;
      letter-spacing: 0.01em;
      font-size: 16px;
      line-height: 25px;
      padding: 20px 0 36px 0;
      margin-top: 35px;
    }

    .video {
      width: 100%;
      position: relative;
      cursor: pointer;

      & > div {
        padding-top: 0% !important;
        text-align: center;
        height: 100%;

        @media (max-width: 416px) {
          height: 100%;
        }
      }

      .video-react .video-react-big-play-button {
        height: 60px;
        width: 60px;
        line-height: 55px;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .h__GameInfo {
    h3 {
      font-size: 30px;
      font-weight: 600;
      padding-top: 50px;

      @media (max-width: 416px) {
        font-size: 24px;
      }
    }

    span {
      display: inline-block;
      color: #b8bdb9;
      font-size: 18px;
      padding-top: 20px;
      max-width: 258px;
      text-align: center;
      @media (max-width: 768px) {
        max-width: 100%;
      }
    }

    p {
      padding-top: 12px;

      button {
        color: #05D8F5;
        background: transparent;
        border: none;
        outline: none;
      }
    }
  }

  @media (max-width: 768px) {
    iframe {
      height: 500px;
    }
  }

  @media (max-width: 560px) {
    iframe {
      height: 300px;
    }
  }
`;
const NftGame = () => {

  return (
    <>
      <div className="main-our-benefit nft-game">
        <div className="all">
          <div className="main-title-benefit">Coming IDO on our Launchpad</div>
          <div className="box-nft-game">
            <p className="desc">
              &quot;Legend of Galaxy&quot; has gameplay that combines collecting, upgrading available cards, and overcoming challenges. Your task is to arrange, choose the best lineup of characters
              and place
              them in the path of the enemy in the game screen to win and conquer new lands.
            </p>
            <div className="box-img-nft-game">
              <img src="/images/imagesDashboard/gameNftAtr.png" alt="" />
            </div>
          </div>
          <div className="benefit-top2">
            <div className="table-benefit">
              <div className="columns cus">
                <div className="colum">
                  <div className="box-img cus animation-css">
                    <img src="/images/imagesDashboard/gameNftAtr2.png" alt="" />
                  </div>
                </div>
                <div className="colum">
                  <div className="content-row">
                    <div className="title">Style</div>
                    <p className="desc cus">
                      &quot;Legend of Galaxy&quot; has gameplay that combines collecting, upgrading available cards, and overcoming challenges. Your task is to arrange, choose the best lineup of characters
                      and place them in the path of the enemy in the game screen to win and conquer new lands. It is known that each hero has a different skill set, so it is imperative to find out who
                      works well with each other.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="benefit-top h__benefitBottom">
            <div className="table-benefit">
              <div className="columns cus">
                <div className="colum">
                  <div className="content-row">
                    <div className="title">Characters</div>
                    <p className="desc cus">
                      &quot;Legend of Galaxy&quot; is a crossroad game combined with general card role-playing;
                      players will have the opportunity to recruit more than 100 characters and build the most powerful
                      squad to participate in campaigns to capture the new land in the galaxy.
                    </p>
                  </div>
                </div>
                <div className="colum h__flex">
                  <div className="h__boxImg h__flex h__position">
                    <div className="h__iconGame1 animation-css position-absolute h__wimg">
                      <img src="/images/imagesDashboard/iconGame1.png" alt="" />
                    </div>
                    <div className="h__iconGame2 animation-css position-absolute h__wimg">
                      <img src="/images/imagesDashboard/iconGame2.png" alt="" />
                    </div>
                    <div className="h__iconGame3 animation-css h__repon h__wimg">
                      <img src="/images/imagesDashboard/iconGame3.png" alt="" />
                    </div>
                    <div className="h__iconGame4 animation-css position-absolute h__wimg">
                      <img src="/images/imagesDashboard/iconGame4.png" alt="" />
                    </div>
                    <div className="h__iconGame5 animation-css position-absolute h__wimg">
                      <img src="/images/imagesDashboard/iconGame5.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NftGame;
