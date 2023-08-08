import { Inject, Injectable } from '@nestjs/common'
import { CreateUserDTO } from '../dtos/user/createUser.dto'
import { User } from '../entities/user.entity'
import {
  USER_REPOSITORY,
  UserRepositoryInterface
} from '../repositories/user/user.interface.repository'
import { Service } from './interfaces/service.interface'
import * as bcrypt from 'bcrypt';
import { userToUserResponse } from './mappers/user.mapper'

@Injectable()
export class UserService extends Service<User> {
  SERVICE_NAME = 'USER_SERVICE'

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryInterface
  ) {
    super()
  }

  async create(dto: CreateUserDTO) {
    try {

      dto.password = await bcrypt.hash(dto.password, 10)
      const user = await this.repository.create(new User(dto))

      return userToUserResponse(user)
    } catch (error) {
      console.log(error)
      this.catchErrors(error, [])
    }
  }
}
