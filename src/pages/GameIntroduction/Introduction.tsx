import React from 'react'
import styled from 'styled-components'
import { Player, ControlBar } from 'video-react'

import 'video-react/dist/video-react.css'

import Container from '../../components/LayoutCustom'
import GameInfo from './GameInfo'

const GIntroduction: any[] = [
  {
    label: 'Introduction',
    title:
      '“The Lords of Galaxy” is a passing game with card role-playing; Players will have the opportunity to recruit more than 100 characters and build the most powerful ',
    video: 'video',
  },
]

const GameInfos: any[] = [
  {
    id: 1,
    img: '/images/imgGame/GameInfo0.png',
    label: 'How to play',
    title:
      '"The Lords of Galaxy" has gameplay that combines collecting, upgrading available cards, and overcoming challenges. ',
  },
  {
    id: 2,
    img: '/images/imgGame/GameInfo1N.png',
    label: 'PvE Campaign',
    title:
      'Campaign Mode is the most important game mode of the game as it fits the plot of "The Lords of Galaxy" and also has ',
  },
  {
    id: 3,
    img: '/images/imgGame/abc 2.png',
    label: 'Play to earn',
    title:
      'There is a token ratio dedicated to user incentives when playing the game. By completing PVE campaigns, countless quests and',
  },
]

const Introduction = () => {
  return (
    <Wrapper>
      <Container width={1505} padding={30} className="hieu">
        {GIntroduction.map((item) => (
          <div className="h__Introduction f-column tw">
            <h1 className="tw">{item.label}</h1>
            <p>{item.title}</p>
            <div className="video">
              <Player playsInline poster="/images/imagesDashboard/hinhvideo.png">
                <source src="Video/VideoGameN.mp4" />
              </Player>
            </div>
          </div>
        ))}

        <div className="column">
          {GameInfos.map((item) => (
            <GameInfo key={item.id} {...item} />
          ))}
        </div>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;

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
    margin: 40px 0 85px 0;

    h1 {
      font-size: 34px;
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
      font-size: 18px;
      color: #b8bdb9;
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
        height: 550px;

        @media (max-width: 416px) {
          height: 200px;
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
      font-size: 24px;
      font-weight: 500;
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
`
export default Introduction
