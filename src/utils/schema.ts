export interface HandlerTokenInfoData {
  circulatingSupply?: number
  gateURL?: string

  /**
   * PancakePrice         float64 `json:"pancakePrice"`
   * PancakePriceChange   float64 `json:"pancakePriceChange"`
   * UniswapPrice         float64 `json:"uniswapPrice"`
   * UniswapPriceChange   float64 `json:"uniswapPriceChange"`
   * TotalLiquidity       float64 `json:"totalLiquidity"`
   * TotalLiquidityChange float64 `json:"totalLiquidityChange"`
   * Volume               float64 `json:"volume"`
   * VolumeChange         float64 `json:"volumeChange"`
   * Transaction          int     `json:"transaction"`
   * TransactionChange    float64 `json:"transactionChange"`
   */
  pancakeURL?: string
  price?: number
  priceChange?: number
  totalSupply?: number
  totalVolume?: number
  totalVolumeChange?: number
}

export interface HandlerTokenInfoResponse {
  data?: HandlerTokenInfoData
}
