/* eslint-disable prettier/prettier */
//now lets create a home Dto

import { propertyType } from "@prisma/client";
import {Exclude, Expose, Type} from "class-transformer"
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";

export class HomeResponseDto {
    id: number;
    address: string;
    @Exclude()
    number_of_bedrooms: number;

    @Expose({name: "numberOfBedrooms"})
    numberOfBedrooms(){
        return this.number_of_bedrooms
    }
    @Exclude()
    number_of_bathrooms: number;

    @Expose({name: "numberOfBathrooms"})
    numberOfBathrooms(){
        return this.number_of_bathrooms
    }

    city: string;

    @Exclude()
    listed_date: Date;

    @Expose({name: "listedDates"})
    listedDates(){
        return this.listed_date
    }
    price: number;

    image: string;

    @Exclude()
    land_size: number;

    @Expose({name: "landSize"})
    landSize(){
        return this.land_size
    }
    propertyType: propertyType;

    @Exclude()
    created_at: Date;

    // @Expose({name: "createdAt"})
    // createdAt(){
    //     return this.created_at
    // }


    @Exclude()
    updated_at: Date;

    // @Expose({name: "updatedAt"})
    // updatedAt(){
    //     return this.updated_at
    // }

    @Exclude()
    realtor_id: number;

    // @Expose({name: "realtorId"})
    // realtorId(){
    //     return this.realtor_id
    // }

    constructor(partial: Partial<HomeResponseDto>){
        Object.assign(this, partial);
    }
} 

 //so this instance, is that Image will be posted as a string
 //url being the string
 class Image {
    @IsString()
    @IsNotEmpty()
    url: string
 }

export class CreateHomeDto {
    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNumber()
    @IsPositive()
    numberOfBedrooms:  number;

    @IsNumber()
    @IsPositive()
    numberOfBathrooms: number;


    @IsString()
    @IsNotEmpty()
    city: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    landSize: number;

    @IsEnum(propertyType)
    propertyType: propertyType;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => Image)
    images: Image[]
}


export class UpdateHomeDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    address?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    numberOfBedrooms?:  number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    numberOfBathrooms?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    city?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    landSize?: number;

    @IsOptional()
    @IsEnum(propertyType)
    propertyType?: propertyType;
}