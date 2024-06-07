/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HomeController } from './home/home.controller';
import { HomeService } from './home/home.service';
import { HomeModule } from './home/home.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user/interceptors/user.interceptor';

@Module({
  imports: [UserModule, PrismaModule, HomeModule],
  controllers: [AppController, HomeController],
  providers: [AppService, HomeService,{
    provide: APP_INTERCEPTOR,
    useClass: UserInterceptor
  }],
})
export class AppModule {}
