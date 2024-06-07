/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/dto/home.dto';
import { propertyType } from '@prisma/client';

interface GetHomesParam {
    city?: string;
    price?: {
        gte?: number;
        lte?: number
    }
    propertyType?: propertyType;
}

//now lets create interface 'createHomeParams'

interface CreateHomeParams {
  
    address: string;
    numberOfBedrooms:  number;
    numberOfBathrooms: number;
    city: string;
    price: number;
    landSize: number;
    propertyType: propertyType;
    images: {url: string}[];
}


//now lets create interface called 'updateHomeParams'
interface UpdateHomeParams {
  
    address?: string;
    numberOfBedrooms?:  number;
    numberOfBathrooms?: number;
    city?: string;
    price?: number;
    landSize?: number;
    propertyType?: propertyType;
}


@Injectable()
export class HomeService {
    constructor(private readonly prismaService: PrismaService){}
     async getHomes(filter: GetHomesParam ): Promise<HomeResponseDto[]>{
        const homes = await this.prismaService.home.findMany({
            select: {
                id: true,
                address: true,
                city: true,
                price: true,
                propertyType: true,
                number_of_bathrooms: true,
                number_of_bedrooms: true,
                images: {
                    select: {
                        url: true
                    },
                    take: 1
                },
            },

            where: filter,
        });
        if(!homes.length){
            throw new NotFoundException();
        }
        return homes.map((home) => {
            const fetchHome = {...home, image: home.images[0].url};
            delete fetchHome.images;
            return new HomeResponseDto(fetchHome)
     });
    }

    async createHome({address, numberOfBathrooms, numberOfBedrooms, city, landSize, price, propertyType, images}: CreateHomeParams, userId: number,){
        const home = await this.prismaService.home.create({
            data: {
                address,
                number_of_bathrooms: numberOfBathrooms,
                number_of_bedrooms: numberOfBedrooms,
                city,
                land_size: landSize,
                propertyType,
                price,
                realtor_id: userId,
            }
        })

        //so herer the images of the homes are assigned by home id to create many imges
        const homeImages = images.map(image => {
            return {...image, home_id: home.id}})

            await this.prismaService.image.createMany({data: homeImages});

            return new HomeResponseDto(home);
        }
        async updateHomeById(id: number, data: UpdateHomeParams){
            const home = await this.prismaService.home.findUnique({
                where:{
                    id
                }
            })
            if(!home){
                throw new NotFoundException();
            }

            const updateHome = await this.prismaService.home.update({
                where:{
                    id
                },
                data
            })

            return new HomeResponseDto(updateHome)
        }

        //so basically here we are manually deleting images along with their homes respectively
        //in order to tackle with the home foreign key constraint found in images
        //coz unfortunately prisma cannot support that
        async deleteHomeById(id: number){
            await this.prismaService.image.deleteMany({
                where: {
                    home_id: id
                },
            });


            await this.prismaService.home.delete({
                where: {
                    id,
                }
            }
            ) 
        }

        async getHomeById(id: number){
            const home = await this.prismaService.home.findUnique({
                where: {
                    id
                },
                select: {
                    id: true,
                    address: true,
                    city: true,
                    price: true,
                    propertyType: true,
                    number_of_bathrooms: true,
                    number_of_bedrooms: true,
                    images: {
                        select: {
                            url: true
                        }
                    }
                }
            })
            if(!home){
                throw new NotFoundException();
            }
            return new HomeResponseDto(home);
        }

        async getRealtorByHomeId(id: number){
         const home = await this.prismaService.home.findUnique({
            where: {
                id
            },
            select: {
                realtor: {
                    select: {
                        name: true,
                        id: true,
                        email: true,
                        phone: true
                    }
                }
            }
         })
         if(!home){
             throw new NotFoundException();
         }
         return home.realtor;
        }
    }
