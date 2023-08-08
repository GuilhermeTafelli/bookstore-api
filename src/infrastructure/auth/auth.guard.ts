import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator'
import { UnauthorizedException } from '../../infrastructure/exception/unauthorized.exception'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    try {
      const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass()
      ])

      if (isPublic) {
        return true
      }

      const authorization = context.switchToHttp().getRequest()
        .headers.authorization

      // console.warn(authorization)
      if (!authorization) {
        console.warn('not set authorization')
        throw new UnauthorizedException([])
      }

      const [, token] = authorization.split(' ')
      if (!token) {
        console.warn('token is not present')
        throw new UnauthorizedException([])
      }
      return true
    } catch (error) {
      console.warn('unknown error')
      throw new UnauthorizedException([])
    }
  }
}
