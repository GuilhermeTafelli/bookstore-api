import { UnauthorizedException } from '../../infrastructure/exception/unauthorized.exception'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()
    const extractJwt = request.headers['authorization']
    console.log('AQUI')
    if (extractJwt) {
      const [, token] = extractJwt.split('Bearer ')

      if (token) {
        const decodedJwt = this.jwtService.decode(token)

        if (!decodedJwt)
          throw new UnauthorizedException('Authorization', 'AuthInterceptor')

        request.userId = decodedJwt['userId']
        request.userType = decodedJwt['type']
      } else {
        throw new UnauthorizedException('Authorization', 'AuthInterceptor')
      }
    } else {
      throw new UnauthorizedException('Authorization', 'AuthInterceptor')
    }

    return next.handle()
  }
}
