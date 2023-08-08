export const OrderByMode = {
  ASC: 'asc',
  DESC: 'desc'
} as const

export type OrderByMode = (typeof OrderByMode)[keyof typeof OrderByMode]
