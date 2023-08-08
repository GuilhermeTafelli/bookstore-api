import { CreateBookDTO } from '../../dtos/book/createBook.dto'
import { Book } from '../../entities/book.entity'

export const BOOK_REPOSITORY = 'BOOK_REPOSITORY'

export interface BookRepositoryInterface {
  create(book: Book): Promise<Book>
  update(id: string, data: Partial<Book>): Promise<Book>
  getById(id: string): Promise<Book>
  delete(id: string): Promise<Book>
  findManyWithFilters(filters: object): Promise<Book[]>
}
