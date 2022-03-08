import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typed from "react-typed";
import { ReactComponent as Icon1 } from "../../images/img/banner/Group-8.svg";
import { ReactComponent as Icon2 } from "../../images/img/banner/Group-7.svg";
import { ReactComponent as Icon6 } from "../../images/img/banner/Group-6.svg";
import { ReactComponent as Icon7 } from "../../images/img/banner/Group-5.svg";
import { ReactComponent as Icon8 } from "../../images/img/banner/Group-4.svg";
import { ReactComponent as Icon9 } from "../../images/img/banner/Group-3.svg";
import { ReactComponent as Icon10 } from "../../images/img/banner/Group-2.svg";
import { ReactComponent as Icon11 } from "../../images/img/banner/Group-1.svg";
import { ReactComponent as Icon12 } from "../../images/img/banner/Group.svg";

import { ReactComponent as Icon3 } from "../../images/img/banner/Vector.svg";

const MainBanner = () => {
  const settings = {
    dots: true,
    arrows: false,
    autoplay: false,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
          //   className: "center",
          //   centerMode: true,
          //   centerPadding: "60px",
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
          //   className: "center",
          //   centerMode: true,
          //   centerPadding: "60px",
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
          //   className: "center",
          //   centerMode: true,
          //   centerPadding: "60px",
        }
      }
    ]
  };
  const contentBannerVer1 = (
    <div className="main-banner">
      <div className="banner-main-img">
        <img src="/images/benefits-left1.png" alt="" />
      </div>
      <div className="all">
        <div className="content-banner-top">
          <h3 className="title-banner">
            <span className="main-color">
              <Typed
                strings={["The most user-friendly and trusted^1500\n"]}
                typeSpeed={50}
                backSpeed={0}
                backDelay={1}
                fadeOut
                loop
                smartBackspace
              />
            </span>{" "}
            <br />
            <Typed
              strings={["decentralized development platform.^500\n"]}
              typeSpeed={70}
              backSpeed={0}
              backDelay={1}
              fadeOut
              loop
              smartBackspace
            />
          </h3>
          <p className="desc">
            Strengths we can create new payouts in transactions with the benefits of speed, cost, quality, reliability
            and safety in the DeFi space!
          </p>

        </div>
        <div className="content-right">
          <ul className="list-item-right">
            <li>
              <div className="icon">
                <img src="/images/imagesDashboard/bnb.png" alt="" />
              </div>
              <div className="text">
                <p className="desc">Total Value Locked</p>
                <p className="number">$0</p>
              </div>
            </li>
            <li>
              <div className="icon">
                <img src="/images/imagesDashboard/chart.png" alt="" />
              </div>
              <div className="text">
                <p className="desc">Total Trading Volume</p>
                <p className="number">$0</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-banner-bottom">
          <div className="content-left">
            <ul className="list-item-left">
              <li>
                <div className="icon">
                  <img src="/images/imagesDashboard/icon-1.png" alt="" />
                </div>
                <div className="text">
                  <p className="desc">The Lowest Trade Fee in the DeFi Space</p>
                  <p className="number">0.1%</p>
                </div>
              </li>
              <li>
                <div className="icon">
                  <img src="/images/imagesDashboard/icon-2.png" alt="" />
                </div>
                <div className="text">
                  <p className="desc">Exchange Fee Reimbursement</p>
                  <p className="number">up to 100%</p>
                </div>
              </li>
              <li>
                <div className="icon">
                  <img src="/images/imagesDashboard/icon-3.png" alt="" />
                </div>
                <div className="text">
                  <p className="desc">Attractive series of IDO and INO on our launchpad</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
  const contentBannerVer2 = (
    <div className="main-banner cus">
      <div className="all">
        <div className="content-banner-top cus">
          <h3 className="title-banner">Welcome to linked Finance World</h3>
          <p className="desc color-fff">
            Linked Finance World is a leading universal Decentralized Exchange which drives massive adoptions in GameFi, Metaverse and many other blockchain technology project.
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="slider-game-hub">
        <Slider {...settings}>
          <div className="item-banner">{contentBannerVer1}</div>
          <div className="item-banner">{contentBannerVer2}</div>
        </Slider>
      </div>
    </>
  );
};
export default MainBanner;
