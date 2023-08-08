import { createMock } from '@golevelup/ts-jest'
import { Test, TestingModule } from '@nestjs/testing'
import GenericException from 'src/infrastructure/exception/generic.exception'
import { NotFoundException } from 'src/infrastructure/exception/notFound.exception'
import { Book } from '../../entities/book.entity'
import {
  BookRepositoryInterface, BOOK_REPOSITORY
} from '../../repositories/book/book.interface.repository'
import { BookService } from '../book.service'

const bookRepositoryMock = createMock<BookRepositoryInterface>()

const book: Book = {
  id: '64d14ddd8636f60ffd918bef',
  title: 'DDD',
  description: 'some description of DDD',
  author: 'Eric Evans',
  publishingCompany: 'Alta Books',
  isRented: false,
  createdAt: new Date()
}

const updatedBook: Book = {
  ...book,
  title: 'new DDD',
  description: 'new some description of DDD',
  author: 'new Eric Evans',
  publishingCompany: 'new Alta Books',
  isRented: false,
  createdAt: new Date()
}

const updatedBookIsRentedTrue: Book = {
  ...updatedBook,
  isRented: true
}

const booksFiltred = [book, updatedBook, updatedBookIsRentedTrue]

const filters = {
  title: 'DDD',
  description: 'some',
  author: 'Eric',
  publishingCompany: 'Alta'
}

describe('Book Service', () => {
  let service: BookService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: BOOK_REPOSITORY,
          useValue: bookRepositoryMock
        }
      ]
    }).compile()

    service = module.get(BookService)
  })

  describe('Create Book', () => {
    it('should create one book and return it', async () => {
      jest.spyOn(bookRepositoryMock, 'create').mockResolvedValue(book)

      const response = await service.create(book)

      expect(response?.id).toBe(book.id)
      expect(response?.title).toBe(book.title)
      expect(response?.description).toBe(book.description)
      expect(response?.author).toBe(book.author)
      expect(response?.publishingCompany).toBe(book.publishingCompany)
    })

    it('should returns an exception if repository throws', async () => {
      jest.spyOn(bookRepositoryMock, 'create').mockImplementation(() => {
        return Promise.reject(new Error())
      })

      await expect(service.create(book)).rejects.toThrow()
    })
  })

  describe('Update Book', () => {
    it('should update one book and return it', async () => {
      jest.spyOn(bookRepositoryMock, 'update').mockResolvedValue(updatedBook)
      jest.spyOn(bookRepositoryMock, 'getById').mockResolvedValue(book)

      const response = await service.update(updatedBook.id, updatedBook)

      expect(response?.id).toBe(updatedBook.id)
      expect(response?.title).toBe(updatedBook.title)
      expect(response?.description).toBe(updatedBook.description)
      expect(response?.author).toBe(updatedBook.author)
      expect(response?.publishingCompany).toBe(updatedBook.publishingCompany)
    })

    it('should returns an exception if repository throws', async () => {
      jest
        .spyOn(bookRepositoryMock, 'getById')
        .mockResolvedValue(updatedBookIsRentedTrue)

      await expect(
        service.update(updatedBookIsRentedTrue.id, book)
      ).rejects.toThrow(GenericException)
    })

    it('should returns an exception if repository throws', async () => {
      jest.spyOn(bookRepositoryMock, 'update').mockImplementation(() => {
        return Promise.reject(new Error())
      })

      await expect(service.update(book.id, book)).rejects.toThrow()
    })
  })

  describe('Rent Book', () => {
    it('should rent one book and return it', async () => {
      jest
        .spyOn(bookRepositoryMock, 'update')
        .mockResolvedValue(updatedBookIsRentedTrue)
      jest.spyOn(bookRepositoryMock, 'getById').mockResolvedValue(book)

      const response = await service.rent(updatedBook.id)

      expect(response?.id).toBe(updatedBookIsRentedTrue.id)
      expect(response?.title).toBe(updatedBookIsRentedTrue.title)
      expect(response?.description).toBe(updatedBookIsRentedTrue.description)
      expect(response?.author).toBe(updatedBookIsRentedTrue.author)
      expect(response?.publishingCompany).toBe(
        updatedBookIsRentedTrue.publishingCompany
      )
      expect(response?.isRented).toBe(updatedBookIsRentedTrue.isRented)
    })

    it('should returns an GenericException', async () => {
      jest
        .spyOn(bookRepositoryMock, 'getById')
        .mockResolvedValue(updatedBookIsRentedTrue)

      await expect(service.rent(updatedBookIsRentedTrue.id)).rejects.toThrow(
        GenericException
      )
    })

    it('should returns an exception if repository throws', async () => {
      jest.spyOn(bookRepositoryMock, 'update').mockImplementation(() => {
        return Promise.reject(new Error())
      })

      await expect(service.rent(book.id)).rejects.toThrow()
    })
  })

  describe('Give Back Book', () => {
    it('should give back one book and return it', async () => {
      jest.spyOn(bookRepositoryMock, 'update').mockResolvedValue(updatedBook)
      jest
        .spyOn(bookRepositoryMock, 'getById')
        .mockResolvedValue(updatedBookIsRentedTrue)

      const response = await service.giveBack(updatedBook.id)

      expect(response?.id).toBe(updatedBook.id)
      expect(response?.title).toBe(updatedBook.title)
      expect(response?.description).toBe(updatedBook.description)
      expect(response?.author).toBe(updatedBook.author)
      expect(response?.publishingCompany).toBe(updatedBook.publishingCompany)
      expect(response?.isRented).toBe(updatedBook.isRented)
    })

    it('should returns an exception if repository throws', async () => {
      jest.spyOn(bookRepositoryMock, 'update').mockImplementation(() => {
        return Promise.reject(new Error())
      })

      await expect(service.giveBack(book.id)).rejects.toThrow()
    })
  })

  describe('Get By ID Book', () => {
    it('should get one book by Id and return it', async () => {
      jest.spyOn(bookRepositoryMock, 'getById').mockResolvedValue(book)

      const response = await service.getById(book.id)

      expect(response?.id).toBe(book.id)
      expect(response?.title).toBe(book.title)
      expect(response?.description).toBe(book.description)
      expect(response?.author).toBe(book.author)
      expect(response?.publishingCompany).toBe(book.publishingCompany)
      expect(response?.isRented).toBe(book.isRented)
    })

    it('should returns an exception if repository throws', async () => {
      jest.spyOn(bookRepositoryMock, 'getById').mockImplementation(() => {
        return Promise.reject(new Error())
      })

      await expect(service.getById(book.id)).rejects.toThrow()
    })

    describe('Find many books with filters', () => {
      it('should find many books and return it', async () => {
        jest
          .spyOn(bookRepositoryMock, 'findManyWithFilters')
          .mockResolvedValue(booksFiltred)

        const response = await service.findManyWithFilters(filters)

        expect(response[0]?.id).toBe(book.id)
        expect(response[0]?.title).toBe(book.title)
        expect(response[0]?.description).toBe(book.description)
        expect(response[0]?.author).toBe(book.author)
        expect(response[0]?.publishingCompany).toBe(book.publishingCompany)
        expect(response[0]?.isRented).toBe(book.isRented)

        expect(response[1]?.id).toBe(updatedBook.id)
        expect(response[1]?.title).toBe(updatedBook.title)
        expect(response[1]?.description).toBe(updatedBook.description)
        expect(response[1]?.author).toBe(updatedBook.author)
        expect(response[1]?.publishingCompany).toBe(
          updatedBook.publishingCompany
        )
        expect(response[1]?.isRented).toBe(updatedBook.isRented)

        expect(response[2]?.id).toBe(updatedBookIsRentedTrue.id)
        expect(response[2]?.title).toBe(updatedBookIsRentedTrue.title)
        expect(response[2]?.description).toBe(
          updatedBookIsRentedTrue.description
        )
        expect(response[2]?.author).toBe(updatedBookIsRentedTrue.author)
        expect(response[2]?.publishingCompany).toBe(
          updatedBookIsRentedTrue.publishingCompany
        )
        expect(response[2]?.isRented).toBe(updatedBookIsRentedTrue.isRented)
      })

      it('should returns an exception if repository throws', async () => {
        jest
          .spyOn(bookRepositoryMock, 'findManyWithFilters')
          .mockImplementation(() => {
            return Promise.reject(new Error())
          })

        await expect(service.findManyWithFilters(filters)).rejects.toThrow()
      })
    })

    describe('Get By ID Book', () => {
      it('should get one book by Id and return it', async () => {
        jest.spyOn(bookRepositoryMock, 'getById').mockResolvedValue(book)

        const response = await service.getById(book.id)

        expect(response?.id).toBe(book.id)
        expect(response?.title).toBe(book.title)
        expect(response?.description).toBe(book.description)
        expect(response?.author).toBe(book.author)
        expect(response?.publishingCompany).toBe(book.publishingCompany)
        expect(response?.isRented).toBe(book.isRented)
      })

      it('should returns an NotFoundException', async () => {
        jest.spyOn(bookRepositoryMock, 'getById').mockReturnValue(null)

        await expect(service.getById(book.id)).rejects.toThrow(NotFoundException)
      })
      
      it('should returns an exception if repository throws', async () => {
        jest.spyOn(bookRepositoryMock, 'getById').mockImplementation(() => {
          return Promise.reject(new Error())
        })

        await expect(service.getById(book.id)).rejects.toThrow()
      })
    })

    describe('Delete By ID Book', () => {
      it('should delete one book by Id and return it', async () => {
        jest.spyOn(bookRepositoryMock, 'delete').mockResolvedValue(book)
        jest.spyOn(bookRepositoryMock, 'getById').mockResolvedValue(book)

        const response = await service.delete(book.id)

        expect(response?.id).toBe(book.id)
        expect(response?.title).toBe(book.title)
        expect(response?.description).toBe(book.description)
        expect(response?.author).toBe(book.author)
        expect(response?.publishingCompany).toBe(book.publishingCompany)
        expect(response?.isRented).toBe(book.isRented)
      })

      it('should returns an GenericException', async () => {
        jest
          .spyOn(bookRepositoryMock, 'getById')
          .mockResolvedValue(updatedBookIsRentedTrue)
  
        await expect(service.delete(updatedBookIsRentedTrue.id)).rejects.toThrow(
          GenericException
        )
      })

      it('should returns an exception if repository throws', async () => {
        jest.spyOn(bookRepositoryMock, 'getById').mockImplementation(() => {
          return Promise.reject(new Error())
        })

        await expect(service.delete(book.id)).rejects.toThrow()
      })
    })
  })
})
