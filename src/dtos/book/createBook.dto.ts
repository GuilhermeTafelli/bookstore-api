import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateBookDTO {
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
