import React, { memo, useState, useCallback } from 'react'
import { isMobile } from 'react-device-detect'
import { Tab, TabContainerProps, Col, Row, Nav } from 'react-bootstrap'

import { PropsTabsBSC } from './index.d'

import './index.less'

const TabsBSC = memo<TabContainerProps&PropsTabsBSC>((props) => {
  const [keySelected, setKeySelected] = useState<any>(props.defaultActiveKey || '')

  const handleSelect = useCallback(key => {
    setKeySelected(key)
  }, [setKeySelected])

  return (
    <Tab.Container
      onSelect={handleSelect}
      {...props}
    >
      <Col className={`tabs-bsc ${ isMobile&&'tabs-bsc-mobile'}`}>
        <Row className='hiden-scrollbar' sm={12}>
          <Nav className='horizontal-scroll-wrapper hiden-scrollbar'>
            {props.tabs?.map(tabProps => {
              return (
                <Nav.Item>
                  <Nav.Link eventKey={tabProps.eventKey} >{tabProps.title}</Nav.Link>
                  {keySelected===tabProps.eventKey&&(<div className='tabs-bsc-line_selected' />)}
                </Nav.Item>
              )
            })}
          </Nav>
          <div className='tabs-bsc-line' />
        </Row>
        <Row sm={12}>
          <Tab.Content>
            {props.tabs?.map(tabProps => {
              return (
                <Tab.Pane eventKey={tabProps.eventKey}>
                  {tabProps.content}
                </Tab.Pane>
              )
            })}
          </Tab.Content>
        </Row>
      </Col>
    </Tab.Container>
  )
})

export * from './index.d'

export default TabsBSC