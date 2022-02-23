export type ArtworkFilter = {
  label: string
  value: any
}

export type TypeFilterProps = {
  filter: ArtworkFilter[],
  title: string | null | undefined,
  keyFilter: string,
  onFilter?: (filters: {key: string, value: any}[]) => any,
  ref?: any
}

export type FilterProps = {
  filters: TypeFilterProps[],
  title?: string | null | undefined
  onCancle?: (params?: any) => any,
  onFilter?: (filters: {key: string, value: any}[]) => any
}

export type TypeFilterRef = {
  value?: string
} 