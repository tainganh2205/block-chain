import React from "react";
import { ImgWithFallback } from "components/ImageWithFallback";
import cx from "classnames";
import Slider, { Settings } from "react-slick";
import data from "data/backer-partner.json";
import { isMobile } from 'react-device-detect'

interface Investor {
  name: string;
  logo: string;
  url: string;
}

const settings: Settings = {
  dots: true,
  dotsClass: "slick-dots slick-thumb",
  className: "partners-slick",
  fade: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
};
const RenderLogos = (props: { investorList: Investor[] }) => {
  return (
    <div className="investor-wrap">
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.investorList.map(({ name, logo, url }) => (
        <div key={name} className="px-4 my-8" style={{maxWidth:isMobile ? 150 : 200}}>
          <a href={url} target="_blank" rel="noreferrer">
            <ImgWithFallback
              title={name}
              className={cx("mx-auto max-h-[80px]")}
              src={`/images/investor/${logo}.webp`}
              fallback={`/img/investor/${logo}.png`}
              alt={name}
              height={73}
            />
          </a>
        </div>
      ))}
    </div>
  );
};
const MainOurPartner = () => {
  const { investorsPage1, investorsPage2, investorsPage3 } = data;
  return (
    <>
      <div className="main-partner">
        <div className="all">
          <div className="content-partner">
            <h3 className="main-title-benefit">Investor & Partner</h3>
            <Slider {...settings}>
              <RenderLogos investorList={investorsPage1} />
              <RenderLogos investorList={investorsPage2} />
              <RenderLogos investorList={investorsPage3} />
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainOurPartner;
