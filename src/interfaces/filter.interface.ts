/* eslint-disable @typescript-eslint/ban-types */
import { Page } from './page.interface'

export interface Filter extends Page {
  orderBy?: {
    [key: string]: 'desc' | 'asc'
  }
  include?: {
    [key: string]: {}
  }
  where?: {
    [key: string]: {}
  }
}
