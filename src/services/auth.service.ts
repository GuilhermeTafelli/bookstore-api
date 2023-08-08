import { Inject, Injectable } from '@nestjs/common'
import { Service } from './interfaces/service.interface'
import { UserRepositoryInterface, USER_REPOSITORY } from '../repositories/user/user.interface.repository'
import { User } from '../entities/user.entity'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '../infrastructure/exception/unauthorized.exception';

@Injectable()
export class AuthService extends Service<User> {
  SERVICE_NAME = 'AUTH_SERVICE'

 
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryInterface,
    private readonly jwtService: JwtService
  ) {
    super()
  }

  async auth(email: string, password: string) {
    try {
      const user = await this.repository.getByEmail(email)

      if(!user) throw new UnauthorizedException()

      const isMatch = await bcrypt.compare(password, user.password);
      
      if(!isMatch) throw new UnauthorizedException()

      const payload = { sub: user.id, email: user.email };

      const accessToken =  await this.jwtService.signAsync(payload)
      return {
        accessToken
      };
    } catch (error) {
      this.catchErrors(error, [])
    }
  }
}
