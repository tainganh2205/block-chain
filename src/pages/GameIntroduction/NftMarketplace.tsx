import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Container from '../../components/LayoutCustom'

const Marketplace: any[] = [
  {
    label: 'NFT Marketplace',
    title:
      'Where players can trade, buy, and lend necessary equipment. In addition, NFT characters can be easily traded between players. ',
  },
]

const NftSlider: any[] = [
  {
    img: '/images/imgGame/NftM1.png',
  },
  {
    img: '/images/imgGame/NftM2.png',
  },
  {
    img: '/images/imgGame/NftM3.png',
  },
  {
    img: '/images/imgGame/NftM4.png',
  },
  {
    img: '/images/imgGame/NftM5.png',
  },
  {
    img: '/images/imgGame/NftM3.png',
  },
]

const NftMarketplace = () => {
  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          className: 'center',
          centerMode: true,
          centerPadding: '60px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          className: 'center',
          centerMode: true,
          centerPadding: '60px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          className: 'center',
          centerMode: true,
          centerPadding: '60px',
        },
      },
    ],
  }
  return (
    <Wrapper>
      <Container width={1505} padding={30} className="hieu">
        {Marketplace.map((item) => (
          <div className="h__Introduction f-column tw">
            <h1 className="tw">{item.label}</h1>
            <p>{item.title}</p>
          </div>
        ))}

        <div className="h__slideContent">
          <Slider {...settings}>
            {NftSlider.map((slide) => (
              <div className="content-item">
                <div className="box-img h__boxImg">
                  <img src={slide.img} alt="..." />
                </div>
              </div>
            ))}
          </Slider>
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
  }

  .w-33 {
    width: calc(4 / 12 * 100%);
    padding: 15px;
  }

  .h__Introduction {
    margin: 75px 0 55px 0;

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
        width: 207px;
        height: 4px;
        background: #169CE7;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);

        @media(max-width: 416px) {
          width: 124px;
        }
      }
    }

    p {
      display: inline-flex;
      max-width: 660px;
      text-align: center;
      font-size: 18px;
      color: #b8bdb9;
      padding: 20px 0 36px 0;
      margin-top: 35px;
    }

    .video {
      width: 100%;
      height: 526px;
      background: black;
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
    }

    p {
      padding-top: 12px;

      a {
        color: #05D8F5;

        &:hover {
          color: #05D8F5 !important;
        }
      }
    }
  }

  .h__slideContent {
    width: 100%;
    height: 100%;
    padding: 20px 0;

    .slick-slider {
      position: relative;
    }
  }
`

export default NftMarketplace
