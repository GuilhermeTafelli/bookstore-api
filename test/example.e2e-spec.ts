import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../src/modules/app.module'
import { TestConstant } from '../src/constants/tests.constant'
import * as request from 'supertest'
import { Example } from '../src/entities/user.entity'
import { ExampleService } from '../src/services/user.service'

let id = TestConstant.uuid

const example = new Example({})

describe('Example Controller (e2e)', () => {
  let app: INestApplication

  let exampleService = {
    getOneById: () => example,
    create: () => example
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(ExampleService)
      .useValue(exampleService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe(`/examples (POST)`, () => {
    it('should create examples', async () => {
      request(app.getHttpServer())
        .post('/examples')
        .send({
          hello: 'world'
        })
        .expect(201)
        .then((result) => {
          console.warn(result.body, result.statusCode)
        })
    })
  })
})
