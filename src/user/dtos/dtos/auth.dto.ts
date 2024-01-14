/* eslint-disable prettier/prettier */
import { UserType } from "@prisma/client"; 
import {IsString, IsNotEmpty, IsEmail, MinLength, Matches, IsEnum, IsOptional} from "class-validator"


//lets create a class validator dto for signup
    //THE PRODUCT KEY WILL PARSED WITHIN THE DTO 
    //Isoptional decorator, self explanatory
    //if you do pass it, it better not be empty and not a string
 export class SignupDto {
    @IsString()
    @IsNotEmpty()
    name: string;


    @Matches(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {message: "phone must be a valid phone number"})
    phone: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    password: string;

  
   @IsOptional()
   @IsString()
   @IsNotEmpty()
   productKey?: string;
 }


 export class SigninDto {
   @IsEmail()
   email: string;

   @IsString()
   password: string;
 
 }

 export class generateProductKeyDto {
   @IsEmail()
   email: string;

   @IsEnum(UserType)
   userType: UserType
 }