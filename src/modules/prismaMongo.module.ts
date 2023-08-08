import { Global, Module } from '@nestjs/common/decorators'
import { PrismaMongoProvider } from '../providers/prismaMongo.provider'

@Global()
@Module({
  imports: [],
  providers: [PrismaMongoProvider],
  exports: [PrismaMongoProvider]
})
export class PrismaMongoModule {}
