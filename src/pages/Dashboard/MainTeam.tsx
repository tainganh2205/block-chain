import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const MainTeam = () => {
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
    <>
      <div className="main-sldier h__ftSlider">
        <div className="all">
          <h3 className="main-title-benefit">Our Team</h3>

          <div className="h__slide-content d-flex flex-wrap">
            <div className="content-item mb-5">
              <div className="box-img h__boxImg">
                <img src="/images/imagesDashboard/devt1.png" alt="" />
                <div className="h__info">
                  <a href="#!">
                    <i className="fab fa-linkedin h__Linkedin1" aria-hidden="true" />
                  </a>
                  <h1>Michael Nguyen</h1>
                  <p>Co Founder/ CEO</p>
                </div>
              </div>
            </div>
            <div className="content-item mb-5">
              <div className="box-img h__boxImg">
                <img src="/images/imagesDashboard/devt2.png" alt="" />
                <div className="h__info">
                  <a href="#!">
                    <i className="fab fa-linkedin h__Linkedin1" aria-hidden="true" />
                  </a>
                  <h1>Yong Phillips</h1>
                  <p>Technical Advisor</p>
                </div>
              </div>
            </div>
            <div className="content-item mb-5">
              <div className="box-img h__boxImg">
                <img src="/images/imagesDashboard/devt3.png" alt="" />
                <div className="h__info">
                  <a href="#!">
                    <i className="fab fa-linkedin h__Linkedin" aria-hidden="true" />
                  </a>
                  <h1>Harry Hwang</h1>
                  <p>Backend Specialist</p>
                </div>
              </div>
            </div>
            <div className="content-item mb-5">
              <div className="box-img h__boxImg">
                <img src="/images/imagesDashboard/dev12.jpg" alt="" />
                <div className="h__info">
                  <a href="#!">
                    <i className="fab fa-linkedin h__Linkedin" aria-hidden="true" />
                  </a>
                  <h1>Kevin Le</h1>
                  <p>Business Development</p>
                </div>
              </div>
            </div>
            <div className="content-item mb-5">
              <div className="box-img h__boxImg">
                <img src="/images/imagesDashboard/dev11.jpg" alt="" />
                <div className="h__info">
                  <a href="#!">
                    <i className="fab fa-linkedin h__Linkedin" aria-hidden="true" />
                  </a>
                  <h1>Anna Nguyen</h1>
                  <p>Digtital Makerting</p>
                </div>
              </div>
            </div>
            <div className="content-item mb-5">
              <div className="box-img h__boxImg">
                <img src="/images/imagesDashboard/devt4.png" alt="" />
                <div className="h__info">
                  <a href="#!">
                    <i className="fab fa-linkedin h__Linkedin" aria-hidden="true" />
                  </a>
                  <h1>Mia Pham</h1>
                  <p>Admin Community</p>
                </div>
              </div>
            </div>

            <div className="content-item mb-5">
              <div className="box-img h__boxImg">
                <img src="/images/imagesDashboard/devt5.png" alt="" />
                <div className="h__info">
                  <a href="#!">
                    <i className="fab fa-linkedin h__Linkedin" aria-hidden="true" />
                  </a>
                  <h1>Martin Nguyen</h1>
                  <p>Blockchain Engineer</p>
                </div>
              </div>
            </div>
            <div className="content-item mb-5">
              <div className="box-img h__boxImg">
                <img src="/images/imagesDashboard/devt6.png" alt="" />
                <div className="h__info">
                  <a href="#!">
                    <i className="fab fa-linkedin h__Linkedin" aria-hidden="true" />
                  </a>
                  <h1>Thomas Du</h1>
                  <p>Blockchain Engineer</p>
                </div>
              </div>
            </div>
            <div className="content-item mb-5">
              <div className="box-img h__boxImg">
                <img src="/images/imagesDashboard/devt9.png" alt="" />
                <div className="h__info">
                  <a href="#!">
                    <i className="fab fa-linkedin h__Linkedin" aria-hidden="true" />
                  </a>
                  <h1>Anatole Vu</h1>
                  <p>Art & Design</p>
                </div>
              </div>
            </div>
            <div className="content-item mb-5">
              <div className="box-img h__boxImg">
                <img src="/images/imagesDashboard/devt10.png" alt="" />
                <div className="h__info">
                  <a href="#!">
                    <i className="fab fa-linkedin h__Linkedin" aria-hidden="true" />
                  </a>
                  <h1>Liam Lee</h1>
                  <p>Game Developer</p>
                </div>
              </div>
            </div>
            <div className="content-item mb-5">
              <div className="box-img h__boxImg">
                <img src="/images/imagesDashboard/devt7.png" alt="" />
                <div className="h__info">
                  <a href="#!">
                    <i className="fab fa-linkedin h__Linkedin" aria-hidden="true" />
                  </a>
                  <h1>Dylan Wang</h1>
                  <p>Game Developer</p>
                </div>
              </div>
            </div>
            <div className="content-item mb-5">
              <div className="box-img h__boxImg">
                <img src="/images/imagesDashboard/devt8.png" alt="" />
                <div className="h__info">
                  <a href="#!">
                    <i className="fab fa-linkedin h__Linkedin" aria-hidden="true" />
                  </a>
                  <h1>Brian Won</h1>
                  <p>Designer & Editor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default MainTeam
