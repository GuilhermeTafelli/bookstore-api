import { Injectable } from '@nestjs/common'
import { User } from '../../entities/user.entity'
import { UserRepositoryInterface } from './user.interface.repository'
import { PrismaMongoProvider } from '../../providers/prismaMongo.provider'

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaMongoProvider) {}

  async create(user: User): Promise<User> {
    return this.prisma.user.create({
      data: user
    })
  }

  async getByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        email
      }
    })
  }

}
