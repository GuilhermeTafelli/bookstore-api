import { Injectable } from '@nestjs/common'
import { Book } from '../../entities/book.entity'
import { BookRepositoryInterface } from './book.interface.repository'
import { PrismaMongoProvider } from '../../providers/prismaMongo.provider'

@Injectable()
export class BookRepository implements BookRepositoryInterface {
  constructor(private readonly prisma: PrismaMongoProvider) {}

  async create(book: Book): Promise<Book> {
    return this.prisma.book.create({
      data: book
    })
  }

  async update(id: string, data: Partial<Book>): Promise<Book> {
    return this.prisma.book.update({
      where: {
        id
      },
      data: {
        ...data,
        updatedAt: new Date()
      }
    })
  }
  async getById(id: string): Promise<Book> {
    return this.prisma.book.findUnique({
      where: {
        id
      }
    })
  }

  findManyWithFilters(filters: object): Promise<Book[]> {
    return this.prisma.book.findMany({
      where: filters
    })
  }

  delete(id: string) {
    return this.prisma.book.delete({
      where: {
        id
      }
    })
  }
}
