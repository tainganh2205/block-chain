import React, { memo, useCallback, useEffect, useState } from 'react'

import Loader from 'components/Loader'
import { useHookNft } from 'pages/Nft/Store-Nft'
import { useActiveWeb3React } from 'hooks'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.less'

const settings = {
  dots: true,
  arrows: false,
  autoplay: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
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

const Statistic = memo(() => {
  const [{ marketInfo, yourBalanceBSCS, BSCSBurned, totalValueLock, totalVL }, actions] = useHookNft()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { account } = useActiveWeb3React()
  const TVL = totalVL.data && totalVL.data.toLocaleString()
  const totalBurned = BSCSBurned && BSCSBurned.result / 1e18
  const BurnedDefaul = 831075
  const SumtotalBurned = (BurnedDefaul + totalBurned).toLocaleString()

  const initData = useCallback(async () => {
    try {
      setIsLoading(true)
      await actions.getMarketInfo()
      await actions.getTotalValueLock()
      await actions.getBSCSBurned()
      // await actions.getTVL()
    } catch (err) {
      console.log({ '[Nft -> Statistic] -> initData': err })
    } finally {
      setIsLoading(false)
    }
  }, [actions])

  useEffect(() => {
    initData()
  }, [initData])

  useEffect(() => {
    actions.getBalanceByWallet(account)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  const colsLeft: any[] = [
    [
      {
        title: 'Your ATF blance',
        value: {
          logo: '/images/logo-m.png',
          value: yourBalanceBSCS?.result ? (yourBalanceBSCS.result / 1e18).toLocaleString() : '0.00',
        },
      },
      {
        title: 'ATF price',
        value: {
          logo: null,
          value: `$ ${marketInfo ? marketInfo.price : '0.00'}`,
        },
      },

      {
        title: 'ATF Market Cap',
        value: {
          logo: null,
          value: `$ ${marketInfo ? marketInfo.market_cap : 0.0}`,
        },
      },
      {
        title: 'Pending harvest',
        value: {
          logo: '/images/logo-m.png',
          value: '0.00',
        },
      },
      {
        title: 'TVL (ATF)',
        value: {
          logo: null,
          // value: `$ ${
          //   marketInfo && totalValueLock ? ((totalValueLock.result / 1e18) * marketInfo.price).toLocaleString() : '0.00'
          // }`,
          value: `$ ${TVL || 0.0}`,
        },
      },
      {
        title: 'Volume(24hr)',
        value: {
          logo: null,
          value: `$${marketInfo ? marketInfo.volume_24h : '0.00'}`,
        },
      },
    ],
  ]

  const colsRight: any[] = [
    [
      {
        title: 'Mint NTF',
        value: {
          logo: null,
          value: marketInfo ? marketInfo.minted_nft : '0.00',
        },
      },
      {
        title: 'NTF Transations',
        value: {
          logo: null,
          value: `$ ${marketInfo ? marketInfo.transactions_nft : '0.00'}`,
        },
      },
    ],
    [
      {
        title: 'NTF Trading vol',
        value: {
          logo: '/images/logo-m.png',
          value: marketInfo ? marketInfo.trading_vol_nft : '0.00',
        },
      },
      {
        title: 'ATF Lock by NTF',
        value: {
          logo: '/images/logo-m.png',
          value: marketInfo ? marketInfo.bake_locked_by_nft : '0.00',
        },
      },
    ],
  ]

  return (
    <div className="nghi">
      <div className="p-bscs-nft-statistic">
        <div className="p-bscs-nft-statistic-left">
          {colsLeft.map((col) => (
            <div className="d-flex f-space">
              {col.map((cell) => (
                <div className="d-flex f-custom">
                  <span className="sz-12 cl-white mb-10 fw-bold">{cell.title}</span>
                  <div className="pt-10 d-flex ">
                    <span>
                      {cell.value.logo && <img src={cell.value.logo} height="25px" width="25px" alt="logo" />}
                    </span>

                    <span>{isLoading ? <Loader /> : <span>{cell.value.value}</span>}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

export default Statistic
