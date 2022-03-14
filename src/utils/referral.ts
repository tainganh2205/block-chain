const key = 'lfw_referral_code'

export function getReferralCode() {
  return window.localStorage.getItem(key) || ''
}

export function setReferralCode(code: string) {
  window.localStorage.setItem(key, code)
}

export function removeReferralCode() {
  window.localStorage.removeItem(key)
}
