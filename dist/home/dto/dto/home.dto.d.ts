import { propertyType } from "@prisma/client";
export declare class HomeResponseDto {
    id: number;
    address: string;
    number_of_bedrooms: number;
    numberOfBedrooms(): number;
    number_of_bathrooms: number;
    numberOfBathrooms(): number;
    city: string;
    listed_date: Date;
    listedDates(): Date;
    price: number;
    image: string;
    land_size: number;
    landSize(): number;
    propertyType: propertyType;
    created_at: Date;
    updated_at: Date;
    realtor_id: number;
    constructor(partial: Partial<HomeResponseDto>);
}
declare class Image {
    url: string;
}
export declare class CreateHomeDto {
    address: string;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    city: string;
    price: number;
    landSize: number;
    propertyType: propertyType;
    images: Image[];
}
export declare class UpdateHomeDto {
    address?: string;
    numberOfBedrooms?: number;
    numberOfBathrooms?: number;
    city?: string;
    price?: number;
    landSize?: number;
    propertyType?: propertyType;
}
export {};
