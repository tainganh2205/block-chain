import { HeroCard, HeroCardProps } from 'components/HeroCard'
import React, { useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { ReactComponent as NavIcon } from './svg/nav-icon.svg'

const NextButton = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    className="absolute right-[-10px] sm:right-[50px] lg:right-[-100px] center-y z-10 cursor-pointer"
    data-testid="hero-carousel-next-button"
  >
    <NavIcon />
  </button>
)

const PrevButton = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    className="absolute left-[-10px] sm:left-[50px] lg:left-[-100px] center-y z-10 cursor-pointer"
  >
    <NavIcon className="rotate-180" data-testid="hero-carousel-prev-button" />
  </button>
)

export interface HeroCarouselProps {
  items: HeroCardProps[]
}

export const HeroCarousel = (props: HeroCarouselProps) => {
  const { items } = props
  const [activeIndex, setActiveIndex] = useState(2)

  const settings: Settings = {
    centerMode: true,
    centerPadding: '-10px',
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />,
    initialSlide: activeIndex,
    slidesToShow: 3,
    speed: 500,
    infinite: true,
    afterChange: (index) => {
      setActiveIndex(index)
    },
    responsive: [
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className="overflow-hidden w-full max-w-7xl mx-auto relative z-0">
      <div className="absolute md:flex z-10 inset-y-0 left-0 w-1/3 hidden pointer-events-none">
        <div className="h-full w-1/5 left-[-5px] bg-gray-800" />
        <div className="h-full w-4/5 bg-gradient-to-r from-gray-800" />
      </div>
      <div className="absolute md:flex z-10 inset-y-0 right-[-5px] w-1/3 hidden pointer-events-none">
        <div className="h-full w-4/5 bg-gradient-to-l from-gray-800" />
        <div className="h-full w-1/5 left-0 bg-gray-800" />
      </div>
      <div className="sm:max-w-[780px] max-w-[260px] mx-auto relative">
        <Slider {...settings}>
          {items.map((hero) => (
            <HeroCard className="w-[260px]" key={hero.id} {...hero} />
          ))}
        </Slider>
      </div>
    </div>
  )
}
