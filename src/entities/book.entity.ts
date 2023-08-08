import { Entity } from './interfaces/entity'

export class Book extends Entity {
  title: string
  description: string
  author: string
  publishingCompany: string
  isRented?: boolean = false
  constructor(
    entity: Omit<Book, 'createdAt' | 'id'>,
    id?: string
  ) {
    super(entity, id, true)
    Object.assign(this, entity)
  }
}
