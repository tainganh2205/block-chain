export type PropsButtonBSC = {
  text?: string,
  icon?: string,
  id?: string,
  className?: string,
  ghost?: boolean,
  loading?: boolean,
  gray?: boolean,
  href?: string,
  disabled?:boolean,
  disabledCustom?:boolean,
  click?: (params: any) => void
}

export type RefButtonBSC = {
  click?: (params: any) => void
}