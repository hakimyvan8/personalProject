import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/dto/home.dto';
import { propertyType } from '@prisma/client';
interface GetHomesParam {
    city?: string;
    price?: {
        gte?: number;
        lte?: number;
    };
    propertyType?: propertyType;
}
interface CreateHomeParams {
    address: string;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    city: string;
    price: number;
    landSize: number;
    propertyType: propertyType;
    images: {
        url: string;
    }[];
}
interface UpdateHomeParams {
    address?: string;
    numberOfBedrooms?: number;
    numberOfBathrooms?: number;
    city?: string;
    price?: number;
    landSize?: number;
    propertyType?: propertyType;
}
export declare class HomeService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getHomes(filter: GetHomesParam): Promise<HomeResponseDto[]>;
    createHome({ address, numberOfBathrooms, numberOfBedrooms, city, landSize, price, propertyType, images }: CreateHomeParams, userId: number): Promise<HomeResponseDto>;
    updateHomeById(id: number, data: UpdateHomeParams): Promise<HomeResponseDto>;
    deleteHomeById(id: number): Promise<void>;
    getHomeById(id: number): Promise<HomeResponseDto>;
    getRealtorByHomeId(id: number): Promise<{
        email: string;
        phone: string;
        name: string;
        id: number;
    }>;
}
export {};
