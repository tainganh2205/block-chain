const baseURL = process.env.BASE_URL || ''

export const IS_PRODUCTION = baseURL === 'https://api.legendfantasywar.com/api'
export const IS_STAGING =
  baseURL === 'https://staging-api.legendfantasywar.com/api'
export const IS_DEVELOPMENT = baseURL === 'https://develop-api.lfw.daf.ug/api'
