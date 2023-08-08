import { ObjectId } from 'bson'
import { v4 as uuid } from 'uuid'

export class Entity {
  id: string
  createdAt: Date
  updatedAt?: Date

  constructor(entity: Omit<Entity, 'createdAt' | 'id'>, id?: string, genObjectId = false) {
    Object.assign(this, entity)

    if (!id) {
      this.id = genObjectId ? new ObjectId().toString():  uuid()
    }

    if (!this.createdAt) {
      this.createdAt = new Date()
    }
  }
}
