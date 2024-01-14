/* eslint-disable prettier/prettier */
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { PrismaModule} from 'src/prisma/prisma.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    //we import the module such that we export the prisma service 
    imports: [PrismaModule],
    controllers: [HomeController],
    providers: [HomeService, {
        provide: APP_INTERCEPTOR,
        useClass: ClassSerializerInterceptor
    }],
})
export class HomeModule {}
