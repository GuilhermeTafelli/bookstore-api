export interface Page {
  skip?: number
  take?: number
}

export interface PageResponse<T> {
  items: T[]
  total: number
}
