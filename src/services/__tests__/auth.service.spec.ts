import { createMock } from '@golevelup/ts-jest'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { UnauthorizedException } from 'src/infrastructure/exception/unauthorized.exception'
import { User } from '../../entities/user.entity'
import {
  UserRepositoryInterface,
  USER_REPOSITORY
} from '../../repositories/user/user.interface.repository'
import { AuthService } from '../auth.service'

const userRepositoryMock = createMock<UserRepositoryInterface>()
const jwt = new JwtService({
  secretOrPrivateKey: process.env.JWT_SECRET_KEY
})
const credentials = {
  email: 'guilhermetafelli@gmail.com',
  password: '1234567',
}

const createdUser: User = {
  id: '64d14ddd8636f60ffd918bef',
  name: 'John',
  email: 'guilhermetafelli@gmail.com',
  password: '$2b$10$ZGu9luzFkSjXs1FliUtzGOG757yxM8qOYgdpsaI9nhmP4slA1/K2S',
  createdAt: new Date()
}
const OLD_ENV = process.env;

describe('User Service', () => {
  let service: AuthService

  beforeAll(async () => {
    process.env = { ...OLD_ENV, JWT_SECRET_KEY: "somesecretkey" };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET_KEY,
          signOptions: { expiresIn: '24h' },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: USER_REPOSITORY,
          useValue: userRepositoryMock
        },
      ]
    }).compile()

    service = module.get(AuthService)
  })

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  describe('Auth', () => {
    it('should auth user and return accessToken', async () => {
      jest.spyOn(userRepositoryMock, 'getByEmail').mockResolvedValue(createdUser)

      const response = await service.auth(credentials.email, credentials.password)
      const decodedJwt = jwt.decode(response.accessToken)

      expect(decodedJwt['sub']).toBe(createdUser.id)
      expect(decodedJwt['email']).toBe(createdUser.email)
    })

    it('should returns an exception if repository throws', async () => {
      jest.spyOn(userRepositoryMock, 'getByEmail').mockImplementation(() => {
        return Promise.reject(new Error())
      })

      await expect(service.auth(credentials.email, credentials.password)).rejects.toThrow()
    })

    it('should try auth with wrong password and receives an UnauthorizedException', async () => {
      jest.spyOn(userRepositoryMock, 'getByEmail').mockResolvedValue(createdUser)
      await expect(service.auth(credentials.email, createdUser.password)).rejects.toThrow(UnauthorizedException)
    })

    it('should try auth with wrong email and receives an UnauthorizedException', async () => {
      jest.spyOn(userRepositoryMock, 'getByEmail').mockResolvedValue(null)
      await expect(service.auth(credentials.email, createdUser.password)).rejects.toThrow(UnauthorizedException)
    })
  })
})
