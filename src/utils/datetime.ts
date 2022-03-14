import dayjs from 'dayjs'

type DateFormat = 'DD-MM-YYYY' | 'HH:mm A · MMM DD, YYYY'
const FIVE_MINUTES = 300000

export interface SyncDateProps {
  days: number
  hours: number
  minutes: number
  remainingTime: number
}

export function formatTime(value: string, format: DateFormat = 'DD-MM-YYYY') {
  return dayjs(value).format(format)
}

export function formatPeriod(seconds: number) {
  const oneWeek = 1 * 7 * 24 * 60 * 60
  const oneDay = 24 * 60 * 60
  const oneHour = 60 * 60
  if (seconds > oneWeek) {
    const numOfWeeks = Math.floor(seconds / oneWeek)
    return numOfWeeks > 1 ? `${numOfWeeks} weeks` : `a week`
  }
  if (seconds > oneDay) {
    const numOfDays = Math.floor(seconds / oneDay)
    return numOfDays > 1 ? `${numOfDays} days` : `a day`
  }
  const numOfHours = Math.floor(seconds / oneHour)
  return numOfHours > 1 ? `${numOfHours} hours` : `a hour`
}

export function formatSyncDate(value: string) {
  const date = new Date().getTime()
  const syncTime = new Date(value as string).getTime()
  const remainingTime = date - syncTime
  const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000))
  const hours = Math.floor(
    (remainingTime % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (1000 * 60))
  return { days, hours, minutes, remainingTime }
}

export function isSyncAble(value: number) {
  const isSyncAble = value < FIVE_MINUTES
  return isSyncAble
}
