import { ElementalType } from 'components/ElementalBadge'
import { HeroCardProps } from 'components/HeroCard'
import { LevelBadgeColor } from 'components/LevelBadge'
import { AssetStatus, HeroRarity, HeroSource } from 'types/hero'
import { ConsumableAssetStatus, ConsumableType } from 'types/consumable'
import { ModelHeroData, ModelConsumableItemData } from 'types/schema'
import { TrustedItemRarity } from 'components/TrustedItemFrame'

interface ReturnType extends HeroCardProps {}

interface Config {
  hrefBase?: string
  render3D?: boolean
  useGif?: boolean
}

export function mapHeroData(
  data: ModelHeroData,
  config: Config = { render3D: false, useGif: false },
): ReturnType {
  const {
    level,
    power,
    star,
    price,
    name,
    id,
    maxStar,
    elementSlug,
    priceUSD,
    symbol,
    heroAvatar,
    colorName,
    heroGif,
    sketchFabId,
    status,
    tokenId,
    rarity,
    source,
  } = data
  const { hrefBase, render3D, useGif } = config

  return {
    id: id ?? '',
    attack: power || 0,
    levelBadgeColor: colorName as LevelBadgeColor,
    elemental: elementSlug as ElementalType,
    stars: star ?? 0,
    level: level ?? 0,
    imageUrl: useGif ? heroGif || heroAvatar || '' : heroAvatar || '',
    gifImageUrl: heroGif || '',
    price: price ?? '0',
    priceUSD: priceUSD ?? 0,
    symbol: symbol ?? 'BNB',
    maxStars: maxStar,
    name: name || '',
    href: hrefBase ? `${hrefBase}/${id}` : undefined,
    sketchFabId: render3D ? sketchFabId : undefined,
    status: status as AssetStatus,
    tokenId,
    rarity: rarity as HeroRarity,
    source: source as HeroSource,
  }
}

export function mapConsumableData(data: ModelConsumableItemData) {
  const {
    rarity,
    quantity = 0,
    name = '',
    price = '0',
    priceUSD = 0,
    symbol = 'LFW',
    avatar,
    status,
    itemType,
  } = data

  return {
    rarity: rarity as TrustedItemRarity,
    quantity,
    name,
    price,
    priceUSD,
    symbol,
    imageUrl: avatar as string,
    status: status as ConsumableAssetStatus,
    itemType: itemType as ConsumableType,
  }
}
