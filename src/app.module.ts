import { Module } from '@nestjs/common';
import { BookModule } from './modules/book/book.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/http.exception.filter';

@Module({
  imports: [UserModule, AuthModule, BookModule, PrismaModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ],
})
export class AppModule { }
