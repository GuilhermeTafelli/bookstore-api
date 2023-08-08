import { IsNotEmpty, IsString } from 'class-validator'

export class CreateBookBodyRequest {

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  author: string

  @IsString()
  @IsNotEmpty()
  publishingCompany: string
}