import { TabProps } from 'react-bootstrap'

export type PropsTabBSC = TabProps&{ content: any }

export type PropsTabsBSC = {
  tabs?: PropsTabBSC[]
}