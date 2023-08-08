import { createMock } from '@golevelup/ts-jest'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from 'src/entities/user.entity'
import {
  UserRepositoryInterface,
  USER_REPOSITORY
} from 'src/repositories/user/user.interface.repository'
import { UserService } from '../user.service'

const userRepositoryMock = createMock<UserRepositoryInterface>()

const user: User = {
  id: '64d14ddd8636f60ffd918bef',
  name: 'John',
  email: 'guilhermetafelli@gmail.com',
  password: '$2b$10$ZGu9luzFkSjXs1FliUtzGOG757yxM8qOYgdpsaI9nhmP4slA1/K2S',
  createdAt: new Date()
}

describe('User Service', () => {
  let service: UserService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useValue: userRepositoryMock
        }
      ]
    }).compile()

    service = module.get(UserService)
  })

  describe('Create User', () => {
    it('should create one user and return it', async () => {
      jest.spyOn(userRepositoryMock, 'create').mockResolvedValue(user)

      const response = await service.create(user)

      expect(response?.id).toBe(user.id)
      expect(response?.name).toBe(user.name)
      expect(response?.email).toBe(user.email)
      expect(response?.password).toBe(undefined)
    })

    it('should returns an exception if repository throws', async () => {
      jest.spyOn(userRepositoryMock, 'create').mockImplementation(() => {
        return Promise.reject(new Error())
      })

      await expect(service.create(user)).rejects.toThrow()
    })
  })
})
