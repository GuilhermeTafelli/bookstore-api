import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { AuthInterceptor } from '../../infrastructure/interceptor/auth.interceptor'
import { Public } from '../../decorators/public.decorator'
import { BookService } from '../../services/book.service'
import { CreateBookBodyRequest } from './requests/createBook.request'
import { UpdateBookBodyRequest } from './requests/updateBook.request'

@UseInterceptors(AuthInterceptor)
@Controller('/books')
export class BookController {
  constructor(private readonly service: BookService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateBookBodyRequest) {
    try {
      return this.service.create(body)
    } catch (error) {
      console.log(error)
    }
  }

  @Put(':id')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id') id: string, @Body() body: UpdateBookBodyRequest) {
    try {
      return this.service.update(id, body)
    } catch (error) {
      console.log(error)
    }
  }

  @Get(':id')
  @Public()
  getById(@Param('id') id: string) {
    return this.service.getById(id)
  }

  @Post(':id/rent')
  @Public()
  @HttpCode(HttpStatus.OK)
  rent(@Param('id') id: string) {
    try {
      return this.service.rent(id)
    } catch (error) {
      console.log(error)
    }
  }

  @Post(':id/giveBack')
  @Public()
  @HttpCode(HttpStatus.OK)
  giveBack(@Param('id') id: string) {
    try {
      return this.service.giveBack(id)
    } catch (error) {
      console.log(error)
    }
  }

  @Delete(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    try {
      return this.service.delete(id)
    } catch (error) {
      console.log(error)
    }
  }

  @Get()
  @Public()
  getByFilters(
    @Query('title') title: string,
    @Query('author') author: string,
    @Query('publishingCompany') publishingCompany: string
  ) {
    return this.service.findManyWithFilters({
      title,
      author,
      publishingCompany
    })
  }
}
