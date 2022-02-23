import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper'

SwiperCore.use([Autoplay, Pagination, Navigation])

export default function Slide() {
    const listImage = [
        {
            id: 0,
            img1: '/assets/images/slider01.jpg',
            img2: '/assets/images/slider_img02.png',
        },
        {
            id: 1,
            img1: '/assets/images/slider01.jpg',
            img2: '/assets/images/slider_img01.png',
        }
    ]
    return (
        <>
        <div className="c-slider">
            <Swiper
                pagination
                navigation
                centeredSlides
                watchSlidesVisibility
            >
                {listImage.map((item, i) => {
                    return (
                        <SwiperSlide key={`img_${item.id}`}>
                            <div className="c-slider__item">
                                <img src={item.img1} alt="" />
                                <div className="c-slider__cont">
                                    <div className="c-slider__img">
                                        <img src={item.img2} alt="" />
                                    </div>
                                    <div className="c-slider__text">
                                        <h3>Vote for the artworks you love</h3>
                                        <div className="c-slider__price">
                                            <span>Vote</span>
                                            <span>
                                                1<img src="/assets/images/icon01.svg" alt="" />
                                            </span>
                                            <span>
                                                = 1<img src="/assets/images/icon05.svg" alt="" />
                                            </span>
                                        </div>
                                        <p>{` Let's`} see which are the Hottest Artworks</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            </div>
        </>
    )
}