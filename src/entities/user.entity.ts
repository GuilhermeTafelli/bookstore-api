import { Entity } from './interfaces/entity'

export class User extends Entity {
  name: string
  email: string
  password: string
  constructor(
    entity: Omit<User, 'createdAt' | 'id'>,
    id?: string
  ) {
    super(entity, id, true)
    Object.assign(this, entity)
  }
}
