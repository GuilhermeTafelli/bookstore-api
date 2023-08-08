import { IsEmail, IsNotEmpty } from "class-validator"

export class AuthBodyRequest {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}