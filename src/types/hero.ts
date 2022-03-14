export type HeroRarity = 'N' | 'NR' | 'R' | 'SR' | 'UR' | 'SSR'

export type AssetStatus =
  | 'whitelisting'
  | 'whitelisted'
  | 'importing'
  | 'buying'
  | 'imported'
  | 'init'
  | 'minted'
  | 'minting'
  | 'listing'
  | 'unlisting'
  | 'listed'
  | 'withdrawing'
  | 'transfering'
  | 'updating'
  | 'can_import'
  | 'unclaimed'
  | 'claiming'
  | 'claimed'
  | 'unlisted'

export type MarketplaceType = 'legend-vault' | 'flea-market'

export type HeroSource = 'Legend' | 'Legacy'

export type HeroSortType = '' | 'highest-price' | 'lowest-price'
