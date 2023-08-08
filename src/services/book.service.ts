import { Inject, Injectable, UseInterceptors } from '@nestjs/common'
import { FiltersBookDTO } from '../dtos/book/filtersBook.dto'
import { ErrorCodes } from '../infrastructure/exception/errorCode'
import GenericException from '../infrastructure/exception/generic.exception'
import { CreateBookDTO } from '../dtos/book/createBook.dto'
import { Book } from '../entities/book.entity'
import {
  BOOK_REPOSITORY,
  BookRepositoryInterface
} from '../repositories/book/book.interface.repository'
import { Service } from './interfaces/service.interface'
import { UpdateBookDTO } from '../dtos/book/updateBook.dto'
import { NotFoundException } from '../infrastructure/exception/notFound.exception'

@Injectable()
export class BookService extends Service<Book> {
  SERVICE_NAME = 'BOOK_SERVICE'

  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly repository: BookRepositoryInterface
  ) {
    super()
  }

  async create(dto: CreateBookDTO) {
    try {
      return await this.repository.create(new Book(dto))
    } catch (error) {
      this.catchErrors(error, [])
    }
  }

  async update(id: string, dto: UpdateBookDTO) {
    try {
      const book = await this.repository.getById(id)

      if (book.isRented) throw new GenericException(ErrorCodes.BOOK_IS_RENTED)
      return await this.repository.update(id, dto)
    } catch (error) {
      this.catchErrors(error, [])
    }
  }

  async rent(id: string) {
    try {
      const book = await this.repository.getById(id)

      if (book.isRented) throw new GenericException(ErrorCodes.BOOK_IS_RENTED)
      return await this.repository.update(id, {
        isRented: true
      })
    } catch (error) {
      this.catchErrors(error, [])
    }
  }

  async giveBack(id: string) {
    try {
      return await this.repository.update(id, {
        isRented: false
      })
    } catch (error) {
      this.catchErrors(error, [])
    }
  }

  async getById(id: string): Promise<Book> {
    try {
      const book = await this.repository.getById(id)

      if (!book) throw new NotFoundException('id')

      return book
    } catch (error) {
      this.catchErrors(error, [])
    }
  }

  async findManyWithFilters(filters: FiltersBookDTO) {
    try {
      const finalFilters = {}

      Object.keys(filters).forEach(
        (item) =>
          (finalFilters[item] = {
            mode: 'insensitive',
            contains: filters[item]
          })
      )
      const book = await this.repository.findManyWithFilters(finalFilters)

      return book
    } catch (error) {
      this.catchErrors(error, [])
    }
  }

  async delete(id: string) {
    try {
      const book = await this.repository.getById(id)

      if (book.isRented) throw new GenericException(ErrorCodes.BOOK_IS_RENTED)
      return await this.repository.delete(id)
    } catch (error) {
      this.catchErrors(error, [])
    }
  }
}
