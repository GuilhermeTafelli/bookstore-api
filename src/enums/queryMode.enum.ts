export const QueryMode = {
  INSENSITIVE: 'insensitive',
  DEFAULT: 'default'
} as const

export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]
