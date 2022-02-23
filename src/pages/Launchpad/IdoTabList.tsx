/* eslint-disable prefer-template */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, memo } from 'react'
import { Tabs , Collapse , Progress ,  Button } from 'antd';
import { useHistory } from "react-router-dom";

import { useHookProjects } from './Store'
import { STATUS } from './index.d'

const HeaderPanelV1 = memo<any>(({ data }) => {
    const urls: any[] = [
        {
            href: data.zkchaos,
            icon: '/images/launchpad/url.png'
        },
        {
            href: data.twitter,
            icon: '/images/launchpad/icon-twiiter.png'
        },
        {
            href: data.telegram,
            icon: '/images/launchpad/telegram.png'
        },
        {
            href: data.medium,
            icon: '/images/launchpad/medium.png'
        }
    ]
    return (
        <div className="box-header-panel">
            <div className="header-panel-left">
                <div className="box-logo">
                    <img src={data.logoUrl} alt="..."/>
                </div>
                <div className="list-social">
                    <div className="text-trustfi">
                        {data.name}
                    </div>
                    <ul className="contact-social">
                        {
                            urls.map(u => (
                                <li key={u.href}>
                                    <a href={u.href || '#'} target='blank'>
                                        <img src={u.icon} alt="" />
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="name-wallet">
                    <span className="txt btn-name-wallet">
                        {data.unit}
                    </span>
                    <span className="txt btn-name-wallet">
                        {data.symbol}
                    </span>
                </div>
            </div>
        </div>  
    )
})

const ContentPanel = ({ details, keys, zkchaos }):any => {
    const history = useHistory()
    const getProgressTime = useCallback((startTime) => {
        if (!startTime) {
            return `TBA`
        }
        const now = new Date()
        const utcDate = Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds(),
          0
        )
        const startDate = new Date(startTime)
        const startTS = Date.UTC(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          startDate.getHours(),
          startDate.getMinutes(),
          startDate.getSeconds(),
          0
        )
        let delta = Math.abs(startTS.valueOf() - utcDate.valueOf()) / 1000;
        const days = Math.floor(delta / 86400);
        delta -= days * 86400;
        const hours = Math.floor(delta / 3600);
        delta -= hours * 3600;
        const minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        const seconds = Math.floor(delta % 60);  // in theory the modulus is not required
        return `${days} day${days > 1 ? 's': ''} ${hours}:${minutes}:${seconds}`
    }, [])

    const viewDetail = useCallback(({ownerAddress, id}) => {
        if (ownerAddress && id) {
            history.push(`launchpad/${ownerAddress}/${id}`)
        }
    }, [history])

    const listResult: any = []
    details.forEach((item) => {
        const unit = item.unit.split(' / ')
        const totalRaise = parseInt(String(item.totalRaise))
        listResult.push(
            <div key={item.code} className="colum">
                <div className="guide-content">
                    <div className="guide-header">
                        <h3 className="title">
                            {item.round || ''}
                        </h3>
                        <div className="box-button-header">
                            <div className="txt btn-name-wallet">
                                {(() => {
                                    switch (item.status) {
                                        case STATUS.GOING:
                                            return <span className="going-color">Ongoing</span>
                                        case STATUS.CLOSE:
                                            return <span className="close-color">Closed</span>
                                        case STATUS.COMING:
                                            return <span className="coming-color">Coming</span>
                                        case STATUS.OPEN:
                                            return <span>Open</span>
                                        case STATUS.PENDING:
                                            return <span>Pending</span>
                                        default:
                                            return <span>Unknow</span>
                                    }
                                })()}
                            </div>
                            <a href={zkchaos} target='blank' className="box-icon">
                                <img src="/images/launchpad/url.png" alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="guide-bottom">
                        <p className="price">
                            {item.swapAmount || ''}
                        </p>
                        <p className="total-raise">
                            Total raise
                            <span className="txt-price">
                            {`${totalRaise || 0} ${unit[1]}`}
                        </span>
                        </p>
                        <p className="total-progess">
                            Progress
                            <span className="progress-status">
                            <Progress percent={item.processing || 0} showInfo={false} />
                        </span>
                        </p>
                        <p className="total-opening">
                            {(item.status === STATUS.COMING || item.status === STATUS.GOING) && 'Open in'}
                            <span className="opening-hourse-details">
                            <span className="hourse">
                                {(item.status === STATUS.COMING || item.status === STATUS.GOING) && getProgressTime(item?.socical?.startIDO)}
                            </span>
                            <span className="view-details">
                                <p onClick={() => viewDetail({ ownerAddress: item.ownerAddress, id: item.id })} className="btn-view-details">View details</p>
                            </span>
                        </span>
                        </p>
                    </div>
                </div>
            </div>
        )
    })
    return (
      <div className="box-content-panel">
          <div className="columns">
              {listResult}
          </div>
          <div className="close-box">
            <button type="button" className="btn-close-box">Close</button>
          </div>
      </div>
    )
}

const IDOList = ( {idoList, status }):any => {
    const { Panel } = Collapse
    const listRender:any = []

    idoList.forEach((ido, index) => {
        listRender.push(
          <Panel
            header={(
              <HeaderPanelV1
                data={{
                    unit: ido.unit,
                    symbol: ido.symbol,
                    zkchaos: ido.zkchaos,
                    twitter: ido.twitter,
                    telegram: ido.telegram,
                    medium: ido.medium,
                    logoUrl: ido.logoUrl,
                    name: ido.name
                }}
              />
            )}
            extra={
                <Button size="small" className="on-close-click" key={ido.id}>
                    Close
                </Button>
            }
            key={ido.id}
          >
              <ContentPanel details={ido.idoDetails} keys={ido.id} zkchaos={ido.zkchaos}/>
          </Panel>
        )
    })
    return (
      <Collapse defaultActiveKey={['']} key={status}>
          {listRender}
      </Collapse>
    )
}

const IdoTabList = React.memo(():any => {
    const [state, actions]: any  = useHookProjects()
    const { TabPane } = Tabs

    const listIdo: any = state.idoList
    const list_ongoing: any = []
    const list_open: any = []
    const list_close: any = []
    if (listIdo.length > 0) {
        listIdo.forEach((item) => {
            const _details = item.idoDetails
            if (_details.some(x => x.status === STATUS.OPEN))
                list_open.push(item)
            else if (_details.some(x => x.status === STATUS.GOING || x.status === STATUS.COMING))
                list_ongoing.push(item)
            else
                list_close.push(item)
        })
    }

    return (
        <>
            <div className="box-ido-detail">
                <div className="table-ido-detail">
                    <Tabs defaultActiveKey="1">

                        <TabPane tab="Next IDO" key="1">
                            <div className="table-collapse-custom">
                                <IDOList idoList={list_ongoing} status={STATUS.COMING} />
                            </div>
                        </TabPane>

                        <TabPane  tab="Open IDOs" key="2">
                            <div className="table-collapse-custom">
                                <IDOList idoList={list_open} status={STATUS.OPEN} />
                            </div>
                        </TabPane>
                        
                        <TabPane tab="Past IDOs" key="3">
                            <div className="table-collapse-custom">
                                <IDOList idoList={list_close} status={STATUS.CLOSE} />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    )
})
export default IdoTabList