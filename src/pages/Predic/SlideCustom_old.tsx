import React, { useContext, useEffect, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation,Mousewheel, Pagination, Keyboard , Scrollbar, A11y } from 'swiper';
import { Slider , Input , Button , InputNumber} from 'antd';
import 'antd/dist/antd.css';
import "swiper/swiper.min.css";
import 'swiper/swiper-bundle.css';
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

const IntegerStep = () => {
	const [inputValue, setInputValue] = useState(30);

	const onChangeHandle = value => {
        setInputValue(value);
    };
	const handleClickAdd10 = value => {
		setInputValue(10);
	};
	const handleClickAdd25 = value => {
		setInputValue(25);
	};
	const handleClickAdd50 = value => {
		setInputValue(50);
	};
	const handleClickAdd75 = value => {
		setInputValue(75);
	};
	const handleClickAddMax = value => {
		setInputValue(100);
	};
	return (
		<div>
			<div className="box-input">
                <InputNumber
					value={inputValue}
					onChange={onChangeHandle}
				/>
                <span className="text-input">Balance: 100</span>
            </div>
            <div className="box-slide">
               <Slider
					min={0}
					max={100}
					tooltipVisible={false}
					onChange={onChangeHandle}
					value={typeof inputValue === 'number' ? inputValue : 0}
				/>
            </div>
			<div className="box-btn-number">
                <Button value={10} onClick={handleClickAdd10}>10%</Button>
                <Button value={25} onClick={handleClickAdd25}>25%</Button>
                <Button value={50} onClick={handleClickAdd50}>50%</Button>
                <Button value={75} onClick={handleClickAdd75}>75%</Button>
                <Button value={100} onClick={handleClickAddMax}>Max</Button>
            </div>
		</div>
	  );
}
const SliderContent = (
	<div className="item-swiper-content">
		<div className="item-top">
			<div className="item-top-left">
				<div className="box-icon">
					<img src="/images/imagesPrediction/play-button-1.png" alt="" />
				</div>
				<h3 className="txt">
					Next
				</h3>
			</div>
			<div className="item-top-right">
				<h3 className="txt">
					#1235
				</h3>
			</div>
		</div>
		<div className="item-body">
			<div className="box-price-pool">
				<h4 className="text">
					Prize Pool:
				</h4>
				<p className="price">
					12.312 BNB
				</p>
			</div>
			<h2 className="title-body">
				Select your positions
			</h2>
			<div className="box-trader-view">
				<div className="btn-up">
					Up <span className="price-btn"> 1.3x Payout</span>
					<div className="img-btn">
						<img src="/images/imagesPrediction/up-btn.png" alt="" />
					</div>
				</div>
				<div className="btn-down">
					Down <span className="price-btn"> 5.07x Payout</span>
					<div className="img-btn">
						<img src="/images/imagesPrediction/down-btn.png" alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
)
const SliderContentLast = (
	<div className="item-swiper-content later">
		<div className="item-top">
			<div className="item-top-left">
				<div className="box-icon">
					<img src="/images/imagesPrediction/time-left.png" alt="" />
				</div>
				<h3 className="txt">
					Later
				</h3>
			</div>
			<div className="item-top-right">
				<h3 className="txt">
                    #1236
				</h3>
			</div>
		</div>
		<div className="item-body">
			<div className="box-price-pool">
				<h4 className="text">
                    Entry starts:
				</h4>
				<p className="price">
					12.312 BNB
				</p>
			</div>
			<div className="box-trader-view">
				<div className="btn-up custom-img">
					Up 
					<div className="img-btn">
						<img src="/images/imagesPrediction/bg-later-up.png" alt="" />
					</div>
				</div>
				<div className="btn-down custom-img">
					Down
					<div className="img-btn">
						<img src="/images/imagesPrediction/bg-later-down.png" alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
)
const SliderContentLiveDown = (
	<div className="item-swiper-content live current">
		<div className="item-top">
			<div className="item-top-left">
				<div className="box-icon">
					<img src="/images/imagesPrediction/play-button-2.png" alt="" />
				</div>
				<h3 className="txt">
					Live
				</h3>
			</div>
            <div className="btn-entered">
                <a href="#!">UP Entered</a>
            </div>
			<div className="item-top-right">
				<h3 className="txt">
					#1235
				</h3>
			</div>
		</div>
		<div className="item-body">
			<div className="box-last-price">
                <h3 className="title-price">
                    Last Price
                </h3>
                <div className="price-wrap">
                    <div className="price-wrap-left">
                        $338.638 <img src="/images/imagesPrediction/information.png" alt="" />
                    </div>
                    <div className="price-wrap-right">
                        <img src="/images/imagesPrediction/left-arrow-red.png" alt="" className="img-arrow" /> $-0.123
                    </div>
                </div>
                <ul className="list-wrap-ul">
                    <li>
                        <h4 className="wrap-name">
                            Locked Price:
                        </h4>
                        <p className="wrap-price">
                            $338.761
                        </p>
                    </li>
                    <li>
                        <h4 className="wrap-name font-w-bold">
                            Prize Pool:
                        </h4>
                        <p className="wrap-price font-w-bold">
                            12.312 BNB
                        </p>
                    </li>
                </ul>
            </div>
			<div className="box-trader-view">
				<div className="btn-down">
					<span className="price-btn"> 5.07x Payout</span> DOWN
					<div className="img-btn">
						<img src="/images/imagesPrediction/down-btn-cus.png" alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
)
const SliderContentLiveDownPrev = (
	<div className="item-swiper-content live prev">
		<div className="item-top">
			<div className="item-top-left">
				<div className="box-icon">
					<img src="/images/imagesPrediction/banned-sign.png" alt="" />
				</div>
				<h3 className="txt color-expair font-s-17">
                    Expired
				</h3>
			</div>
			<div className="item-top-right">
				<h3 className="txt color-expair font-s-17">
					#1235
				</h3>
			</div>
		</div>
		<div className="item-body">
			<div className="box-last-price">
                <h3 className="title-price">
                    Last Price
                </h3>
                <div className="price-wrap">
                    <div className="price-wrap-left">
                        $338.638 <img src="/images/imagesPrediction/information.png" alt="" />
                    </div>
                    <div className="price-wrap-right">
                        <img src="/images/imagesPrediction/left-arrow-red.png" alt="" className="img-arrow" /> $-0.123
                    </div>
                </div>
                <ul className="list-wrap-ul">
                    <li>
                        <h4 className="wrap-name">
                            Locked Price:
                        </h4>
                        <p className="wrap-price">
                            $338.761
                        </p>
                    </li>
                    <li>
                        <h4 className="wrap-name font-w-bold">
                            Prize Pool:
                        </h4>
                        <p className="wrap-price font-w-bold">
                            12.312 BNB
                        </p>
                    </li>
                </ul>
            </div>
			<div className="box-trader-view">
				<div className="btn-down">
					<span className="price-btn"> 5.07x Payout</span> DOWN
					<div className="img-btn">
						<img src="/images/imagesPrediction/down-btn-cus.png" alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
)

const SliderContentLiveUp = (
	<div className="item-swiper-content live cus current">
		<div className="item-top">
			<div className="item-top-left">
				<div className="box-icon">
					<img src="/images/imagesPrediction/play-button-2.png" alt="" />
				</div>
				<h3 className="txt">
					Live
				</h3>
			</div>
			<div className="item-top-right">
				<h3 className="txt">
					#1235
				</h3>
			</div>
		</div>
		<div className="item-body">
            <div className="box-trader-view">
				<div className="btn-down">
					UP <span className="price-btn"> 1.03x Payout</span>
					<div className="img-btn">
						<img src="/images/imagesPrediction/btn-up-cus.png" alt="" />
					</div>
				</div>
			</div>
			<div className="box-last-price cus">
                <h3 className="title-price">
                    Last Price
                </h3>
                <div className="price-wrap">
                    <div className="price-wrap-left">
                        $338.638 <img src="/images/imagesPrediction/information.png" alt="" />
                    </div>
                    <div className="price-wrap-right">
                        <img src="/images/imagesPrediction/left-arrow-green.png" alt="" className="img-arrow" /> $0.123
                    </div>
                </div>
                <ul className="list-wrap-ul">
                    <li>
                        <h4 className="wrap-name">
                            Locked Price:
                        </h4>
                        <p className="wrap-price">
                            $338.761
                        </p>
                    </li>
                    <li>
                        <h4 className="wrap-name font-w-bold">
                            Prize Pool:
                        </h4>
                        <p className="wrap-price font-w-bold">
                            12.312 BNB
                        </p>
                    </li>
                </ul>
            </div>
		</div>
	</div>
)
const SliderContentSetPosition = (
	<div className="item-swiper-content set-position">
		<div className="item-top">
			<div className="item-top-left">
				<div className="box-icon">
					<img src="/images/imagesPrediction/left-arrow-2.png" alt="" />
				</div>
				<h3 className="txt">
                    Set Position
				</h3>
			</div>
			<div className="item-top-right">
                <div className="btn-right-position">
                    <img src="/images/imagesPrediction/left-arrow-white.png" alt="" className="img-arrow" /> UP
                </div>
			</div>
		</div>
        <div className="item-body">
            <div className="box-commit">
                <h3 className="title">
                    Commit:
                </h3>
                <div className="commit-logo">
                    <div className="box-logo">
                        <img src="/images/imagesPrediction/logo-bscs.png" alt="" className="img-logo" /> <span className="text">BCSC</span>
                    </div>
                </div>
            </div>
            <IntegerStep />
            <div className="box-btn-amount">
                <a href="#!" className="btn-amount">Enter an amount</a>
            </div>
            <div className="box-desc">
                <p>You won be able to remove or change your position once you enter it</p>
            </div>
        </div>
	</div>
)
const SliderContentCalculating = (
	<div className="item-swiper-content set-position">
		<div className="item-top">
			<div className="item-top-left">
				<div className="box-icon">
					<img src="/images/imagesPrediction/calating.png" alt="" />
				</div>
				<h3 className="txt color-white font-s-17 ">
                    Calculating
				</h3>
			</div>
			<div className="item-top-right">
                <h3 className="txt color-white font-s-17">
					#1235
				</h3>
			</div>
		</div>
        <div className="item-body">
            <div className="box-calculating">
                <div className="btn-calculating">
                   <span className="text">Calculating</span> <img src="/images/imagesPrediction/loading.png" alt="" />
                </div>
            </div>
        </div>
	</div>
)
const SliderContentDownCollecting = (
	<div className="item-swiper-content live prev">
		<div className="item-top">
			<div className="item-top-left">
				<div className="box-icon">
					<img src="/images/imagesPrediction/banned-sign.png" alt="" />
				</div>
				<h3 className="txt color-expair font-s-17">
                    Expired
				</h3>
			</div>
			<div className="item-top-right">
				<h3 className="txt color-expair font-s-17">
					#1235
				</h3>
			</div>
		</div>
		<div className="item-body">
			<div className="box-last-price">
                <h3 className="title-price">
                    Last Price
                </h3>
                <div className="price-wrap">
                    <div className="price-wrap-left">
                        $338.638 <img src="/images/imagesPrediction/information.png" alt="" />
                    </div>
                    <div className="price-wrap-right">
                        <img src="/images/imagesPrediction/left-arrow-red.png" alt="" className="img-arrow" /> $-0.123
                    </div>
                </div>
                <ul className="list-wrap-ul">
                    <li>
                        <h4 className="wrap-name">
                            Locked Price:
                        </h4>
                        <p className="wrap-price">
                            $338.761
                        </p>
                    </li>
                    <li>
                        <h4 className="wrap-name font-w-bold">
                            Prize Pool:
                        </h4>
                        <p className="wrap-price font-w-bold">
                            12.312 BNB
                        </p>
                    </li>
                </ul>
            </div>
			<div className="box-trader-view">
				<div className="btn-down">
					<span className="price-btn"> 5.07x Payout</span> DOWN
					<div className="img-btn">
						<img src="/images/imagesPrediction/down-btn-cus.png" alt="" />
					</div>
				</div>
			</div>
            <div className="box-colleting-win">
                <div className="icon-colleting">
                    <img src="/images/imagesPrediction/icon-collecting.png" alt="" />
                </div>
                <div className="text-collecting">
                    <a href="!#" className="btn-collecting">Collect Winnings</a>
                </div>
            </div>
		</div>
	</div>
)
const SliderContentUpCollecting = (
	<div className="item-swiper-content live prev">
		<div className="item-top">
			<div className="item-top-left">
				<div className="box-icon">
					<img src="/images/imagesPrediction/banned-sign.png" alt="" />
				</div>
				<h3 className="txt color-expair font-s-17">
                    Expired
				</h3>
			</div>
			<div className="item-top-right">
				<h3 className="txt color-expair font-s-17">
					#1235
				</h3>
			</div>
		</div>
		<div className="item-body">
			<div className="box-last-price">
                <h3 className="title-price">
                    Last Price
                </h3>
                <div className="price-wrap">
                    <div className="price-wrap-left">
                        $338.638 <img src="/images/imagesPrediction/information.png" alt="" />
                    </div>
                    <div className="price-wrap-right">
                        <img src="/images/imagesPrediction/left-arrow-red.png" alt="" className="img-arrow" /> $-0.123
                    </div>
                </div>
                <ul className="list-wrap-ul">
                    <li>
                        <h4 className="wrap-name">
                            Locked Price:
                        </h4>
                        <p className="wrap-price">
                            $338.761
                        </p>
                    </li>
                    <li>
                        <h4 className="wrap-name font-w-bold">
                            Prize Pool:
                        </h4>
                        <p className="wrap-price font-w-bold">
                            12.312 BNB
                        </p>
                    </li>
                </ul>
            </div>
			<div className="box-trader-view">
				<div className="btn-down">
					<span className="price-btn"> 5.07x Payout</span> DOWN
					<div className="img-btn">
						<img src="/images/imagesPrediction/down-btn-cus.png" alt="" />
					</div>
				</div>
			</div>
            <div className="box-colleting-win">
                <div className="icon-colleting">
                    <img src="/images/imagesPrediction/icon-collecting.png" alt="" />
                </div>
                <div className="text-collecting">
                    <a href="!#" className="btn-collecting">Collect Winnings</a>
                </div>
            </div>
		</div>
	</div>
)
const SliderContentLiveUpExpair = (
	<div className="item-swiper-content live cus current">
		<div className="item-top">
			<div className="item-top-left">
				<div className="box-icon">
					<img src="/images/imagesPrediction/play-button-2.png" alt="" />
				</div>
				<h3 className="txt">
					Live
				</h3>
			</div>
			<div className="item-top-right">
				<h3 className="txt">
					#1235
				</h3>
			</div>
		</div>
		<div className="item-body">
            <div className="box-trader-view">
				<div className="btn-down">
					UP <span className="price-btn"> 1.03x Payout</span>
					<div className="img-btn">
						<img src="/images/imagesPrediction/btn-up-cus.png" alt="" />
					</div>
				</div>
			</div>
			<div className="box-last-price cus">
                <h3 className="title-price">
                    Last Price
                </h3>
                <div className="price-wrap">
                    <div className="price-wrap-left">
                        $338.638 <img src="/images/imagesPrediction/information.png" alt="" />
                    </div>
                    <div className="price-wrap-right">
                        <img src="/images/imagesPrediction/left-arrow-green.png" alt="" className="img-arrow" /> $0.123
                    </div>
                </div>
                <ul className="list-wrap-ul">
                    <li>
                        <h4 className="wrap-name">
                            Locked Price:
                        </h4>
                        <p className="wrap-price">
                            $338.761
                        </p>
                    </li>
                    <li>
                        <h4 className="wrap-name font-w-bold">
                            Prize Pool:
                        </h4>
                        <p className="wrap-price font-w-bold">
                            12.312 BNB
                        </p>
                    </li>
                </ul>
            </div>
            <div className="box-colleting-win cus">
                <div className="icon-colleting">
                    <img src="/images/imagesPrediction/icon-collecting.png" alt="" />
                </div>
                <div className="text-collecting">
                    <a href="!#" className="btn-collecting">Collect Winnings</a>
                </div>
            </div>
		</div>
	</div>
)
const SliderContentLastEntered = (
	<div className="item-swiper-content entered later">
		<div className="item-top">
			<div className="item-top-left">
				<div className="box-icon">
					<img src="/images/imagesPrediction/play-button-1.png" alt="" />
				</div>
				<h3 className="txt">
					Next
				</h3>
			</div>
			<div className="item-top-right">
				<h3 className="txt color-white">
					#1235
				</h3>
			</div>
		</div>
		<div className="item-body">
			<div className="box-price-pool">
				<h4 className="text">
                    Entry starts:
				</h4>
				<p className="price">
					12.312 BNB
				</p>
			</div>
			<div className="box-trader-view">
				<div className="btn-up">
					Up 
					<div className="img-btn">
						<img src="/images/imagesPrediction/bg-later-up.png" alt="" />
					</div>
				</div>
				<div className="btn-down">
					Down
					<div className="img-btn">
						<img src="/images/imagesPrediction/bg-later-down.png" alt="" />
					</div>
				</div>
			</div>
            <div className="box-entered">
                <a href="#!" className="btn-entered">Entered</a>
            </div>
		</div>
	</div>
)
const SliderContentSelectUpDown = (
	<div className="item-swiper-content select-up-down">
		<div className="item-top">
			<div className="item-top-left">
				<div className="box-icon">
					<img src="/images/imagesPrediction/play-button-1.png" alt="" />
				</div>
				<h3 className="txt">
					Next
				</h3>
			</div>
			<div className="item-top-right">
				<h3 className="txt">
					#1235
				</h3>
			</div>
		</div>
		<div className="item-body">
			<div className="btn-up">
				Up <span className="price-btn"> 1.3x Payout</span>
				<div className="img-btn">
					<img src="/images/imagesPrediction/up-select.png" alt="" />
				</div>
			</div>
			<div className="rating-pool">
				<div className="box-price-pool">
					<h4 className="text">
						Prize Pool:
					</h4>
					<p className="price">
						12.312 BNB
					</p>
				</div>
				<div className="box-btn-rating">
					<a href="#!" className="btn-rating-up">Enter Up</a>
					<a href="#!" className="btn-rating-down">Enter Down</a>
				</div>
			</div>
			<div className="btn-down">
				Down <span className="price-btn"> 5.07x Payout</span>
				<div className="img-btn">
					<img src="/images/imagesPrediction/down-select.png" alt="" />
				</div>
			</div>
		</div>
	</div>
)
const SlideCustom = () => {
    SwiperCore.use([Navigation, Mousewheel ,Pagination, Scrollbar, Keyboard, A11y ,]);
    return (
        <Swiper
            spaceBetween={0}
            centeredSlides
            loop
			mousewheel
            slidesPerView={2}
            direction="vertical"
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            <SwiperSlide>{SliderContentSelectUpDown}</SwiperSlide>
            <SwiperSlide>{SliderContentLast}</SwiperSlide>
            <SwiperSlide>{SliderContentLiveDownPrev}</SwiperSlide>
        </Swiper>
    )
}
export default SlideCustom;