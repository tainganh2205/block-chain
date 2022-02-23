import { TabsProps, TabPaneProps } from 'antd'

export type TabPanePropsBSC = TabPaneProps& {
  key?: string
  value?: string
}

export type TabsPropsBSC = TabsProps & {
  tabs: TabPanePropsBSC[]
}