import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const MainSlider = () => {
    const settings = {
        dots: true,
        arrows: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
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
              className: "center",
              centerMode: true,
              centerPadding: "60px",
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
              className: "center",
              centerMode: true,
              centerPadding: "60px",
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              className: "center",
              centerMode: true,
              centerPadding: "60px",
            }
          }
        ]
    };
    return (
        <>
            <div className="main-sldier">
                <div className="all">
                    <div className="slide-content">
                        <Slider {...settings}>
                            <div className="content-item">
                                <div className="box-img">
                                    <img src="/images/imagesDashboard/slide-1.png" alt="" />
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="box-img">
                                    <img src="/images/imagesDashboard/slide-2.png" alt="" />
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="box-img">
                                    <img src="/images/imagesDashboard/slide-3.png" alt="" />
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="box-img">
                                    <img src="/images/imagesDashboard/slide-1.png" alt="" />
                                </div>
                            </div>
                            <div className="content-item">
                                <div className="box-img">
                                    <img src="/images/imagesDashboard/slide-2.png" alt="" />
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MainSlider

