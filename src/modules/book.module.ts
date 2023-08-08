import { Module } from '@nestjs/common/decorators'
import { BookController } from '../controllers/book/book.controller'
import { BookService } from '../services/book.service'
import { BOOK_REPOSITORY } from '../repositories/book/book.interface.repository'
import { BookRepository } from '../repositories/book/book.repository'

@Module({
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: BOOK_REPOSITORY,
      useClass: BookRepository
    }
  ],
  exports: []
})
export class BookModule {}
