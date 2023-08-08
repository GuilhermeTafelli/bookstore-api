require('dotenv').config()
import { NestFactory } from '@nestjs/core'
import * as cors from 'cors'
import { ExceptionHandler } from './handlers/exception.handler'
import { AppModule } from './modules/app.module'
import { ValidationPipe } from '@nestjs/common/pipes'
require('events').EventEmitter.prototype._maxListeners = 100

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    cors({
      allowedHeaders: '*',
      origin: '*'
    })
  )
  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  app.useGlobalFilters(new ExceptionHandler())

  await app.listen(process.env.PORT || 8080, () =>
    console.log(`service on in ${process.env.PORT || 8080}`)
  )
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
