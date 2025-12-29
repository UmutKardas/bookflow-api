import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [UserModule, AuthModule, BookModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
