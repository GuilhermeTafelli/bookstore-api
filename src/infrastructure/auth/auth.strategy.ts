import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  async validate() {
    return {}
  }
}
