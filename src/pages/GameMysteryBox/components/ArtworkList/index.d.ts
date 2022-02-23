import { PaginationBSCProps } from 'components/Pagination2'
import { TypeFilterProps } from './Filter/index.d'

export type ArtworkListProps = {
  artworks: any[],
  isLoading: boolean,
  isGameBox?: boolean,
  isGameCharacter?: boolean,
  pagination: PaginationBSCProps,
  onFilter?: (filters: {key: string, value: any}[]) => any
  getMore: (params?: any) => any,
  filters: TypeFilterProps[]
  handleSearch?: (keyword: any) => any
}

export enum TYPE_ARTWORK {
  IMAGE = 1,
  VIDEO = 2,
  GIF = 3
}

export enum STATUS_ARTWORK {
  REVIEWED = 1,
  PENDING = 0,
  REJECT = 2,
  BIDDING = 3
}

export enum SORT_ARTWORK {
  LASTEST = 0,
  PRICE_ASC = 1, 
  PRICE_DESC = 2, 
}