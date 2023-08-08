import { Module } from '@nestjs/common/decorators'
import { APP_GUARD } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '../infrastructure/auth/auth.guard'
import { UserModule } from './user.module'
import { AuthModule } from './auth.module'

import { ConfigModule } from '@nestjs/config'
import { PrismaMongoModule } from './prismaMongo.module'
import { BookModule } from './book.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaMongoModule,
    AuthModule,
    UserModule,
    BookModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    JwtService
  ]
})
export class AppModule {}
