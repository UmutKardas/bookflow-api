import { Module } from '@nestjs/common';
import { BookModule } from './modules/book/book.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [UserModule, AuthModule, BookModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
