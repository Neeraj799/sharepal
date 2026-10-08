const DAY_MS = 86_400_000
const ORDINAL_RULES = new Intl.PluralRules('en', { type: 'ordinal' })
const ORDINAL_SUFFIX = { one: 'st', two: 'nd', few: 'rd', other: 'th' }

export const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

export const addDays = (date, days) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)

// Delivery and pickup days are free, so only the days in between are charged.
export function getChargeablePeriod(delivery, pickup) {
  const days = Math.max(1, Math.round((pickup - delivery) / DAY_MS) - 1)
  const start = addDays(delivery, 1)
  return { days, start, end: addDays(start, days - 1) }
}

// "Oct 10, 2026"
export const formatFullDate = (date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

// "10th Oct"
export const formatDayMonth = (date) =>
  `${date.getDate()}${ORDINAL_SUFFIX[ORDINAL_RULES.select(date.getDate())]} ${date.toLocaleDateString('en-US', { month: 'short' })}`
