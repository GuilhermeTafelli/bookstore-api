import { IsOptional, IsString } from 'class-validator'

export class UpdateBookBodyRequest {

  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  author?: string

  @IsString()
  @IsOptional()
  publishingCompany?: string
}