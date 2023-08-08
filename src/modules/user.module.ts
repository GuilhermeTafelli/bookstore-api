import { Module } from '@nestjs/common/decorators'
import { UserController } from '../controllers/user/user.controller'
import { UserService } from '../services/user.service'
import { USER_REPOSITORY } from '../repositories/user/user.interface.repository'
import { UserRepository } from '../repositories/user/user.repository'

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository
    }
  ],
  exports: []
})
export class UserModule {}
