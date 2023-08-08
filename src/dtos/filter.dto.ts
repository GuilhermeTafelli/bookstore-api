import { Type } from 'class-transformer'
import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  Min,
  ValidateNested
} from 'class-validator'
import { OrderByMode } from '../enums/orderByMode.enum'
import { QueryMode } from '../enums/queryMode.enum'

export class OrderByDTO {
  @IsString()
  attribute: string

  @IsEnum(OrderByMode)
  mode: OrderByMode
}

export class FilterDTO {
  @IsOptional()
  @IsNumberString()
  @Min(1)
  page?: number

  @IsOptional()
  @IsNumberString()
  @Min(1)
  pageSize?: number

  @IsOptional()
  @IsEnum(QueryMode)
  queryMode?: QueryMode

  @ValidateNested({ each: true })
  @Type(() => OrderByDTO)
  orderBy?: OrderByDTO
}
