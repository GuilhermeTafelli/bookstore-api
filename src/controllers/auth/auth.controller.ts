import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { Public } from '../../decorators/public.decorator'
import { AuthService } from '../../services/auth.service'
import { AuthBodyRequest } from './requests/auth.request'

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: AuthBodyRequest) {
    return this.service.auth(body.email, body.password)
  }
 
}
