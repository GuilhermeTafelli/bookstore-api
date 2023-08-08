import { Module } from '@nestjs/common/decorators'
import { JwtModule } from '@nestjs/jwt'
import { USER_REPOSITORY } from '../repositories/user/user.interface.repository'
import { UserRepository } from '../repositories/user/user.repository'
import { AuthController } from '../controllers/auth/auth.controller'
import { AuthService } from '../services/auth.service'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository
    },
    AuthService
  ],
})
export class AuthModule {}
