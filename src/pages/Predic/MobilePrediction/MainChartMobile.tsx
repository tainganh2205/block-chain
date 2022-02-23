import React, { useContext, useEffect, useState, useMemo } from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const MainChartMobile = () => {
    return (
        <>
            <div className="box-chart-main">
                <div className="box-img">
                    <TradingViewWidget
                        symbol="BINANCE:BNBUSDT"
                        theme={Themes.DARK}
                        autosize
                        interval= "5"
                        locale= "en"
                        time
                        toolbar_bg= "#f1f3f6"
                        withdateranges= "true"
                        allow_symbol_change
                        timezone = "Etc/UTC"
                        hide_side_toolbar = {false}
                        className = 'chartcustomized'
                        plotLineColorGrowing =  "rgba(60, 188, 152, 1)"
                        plotLineColorFalling = "rgba(255, 74, 104, 1)"
                        gridLineColor = "rgba(233, 233, 234, 1)"
                        scaleFontColor = "rgba(214, 216, 224, 1)"
                        belowLineFillColorGrowing = "rgba(60, 188, 152, 0.05)"
                        belowLineFillColorFalling = "rgba(255, 74, 104, 0.05)"
                        symbolActiveColor = "rgba(242, 250, 254, 1)"
                    />
                </div>
            </div>
        </>
    )
}
export default MainChartMobile;