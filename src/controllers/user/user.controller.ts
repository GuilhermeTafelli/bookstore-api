import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { Public } from '../../decorators/public.decorator'
import { UserService } from '../../services/user.service'
import { CreateUserBodyRequest } from './requests/createUser.request'

@Controller('/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateUserBodyRequest) {
    try{
      return this.service.create(body)
    }catch(error){
      console.log(error)
    }
  }
 
}
