/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client';
import {OnModuleDestroy, OnModuleInit} from '@nestjs/common';


//this prisma client is going to contain all of the different
//methods we are going to utilize in communicating with the database

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
     async onModuleInit() {
        this.$connect;
    }
    async onModuleDestroy() {
        await this.$connect;
    }
}
