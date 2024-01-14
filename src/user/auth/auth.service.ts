/* eslint-disable prettier/prettier */
'use-strict';

import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcryptjs";
//lets grab the userType enum from prisma
import {UserType} from "@prisma/client"
import * as jwt from "jsonwebtoken";

//we created the interface for signup
interface SignUpParams {
    email: string;
    password: string;
    name: string;
    phone: string
}

//we created the interface for signin
interface SigninParams {
    email: string;
    password: string
}
@Injectable()
export class AuthService {
    constructor (private readonly prismaService: PrismaService){}

    //lets create the asynchronous function for signup
    async signup({ email, password, phone, name }: SignUpParams, userType: UserType){
        //checks if there is an existing user with the existing email
        const userExists = await this.prismaService.user.findUnique({
            //by using find unique, we tell this function to 
            //specifically find the email where
            where: {
                email,
            }
        })

        //now we add a truthy exception that will throw
        //an exception if a user exists
        if(userExists){
            throw new ConflictException
        }

        //let hash passwords and log them on the console just for testing purporses
        const hashedPassword = await bcrypt.hash(password, 10)

        console.log({hashedPassword})

        //now lets store the user in the database
        const user = await this.prismaService.user.create({
            data: {
                email,
                name,
                phone,
                password: hashedPassword,
                userType: userType,
            },
        });

        //now lets initialize a jsonwebtoke (jwt) that we shall send once we sign up
        //now we have to configure a payload within the sign property
        return this.generateJWT(name, user.id)
    }


//lets create the asynchronous function for signin
    async signin({email, password}: SigninParams){

        //step 1 find the user
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
                // password
            }
        })

        //if the user doesnt exists
        if(!user){
            throw new HttpException ("Invalid Credentials", 400);
        }

        //now if it all goes good lets validate the password
        //first lets declare the hashedpassword
        const hashedPassword = user.password;
        //now lets compare the declared hashed password statement to the provided plain password by the user
        const isValidPassword = await bcrypt.compare(password, hashedPassword)

        //now if the hashedpassword doesn't compare to the plain password provided, then...
        if(!isValidPassword){
            throw new HttpException ("Invalid Credentials", 400);
        }

          return this.generateJWT(user.name, user.id);

        }

        //now we can pass the generateJWT token as a private function
        //coz it wont be exported, it will be used within this function.
        private async generateJWT(name: string, id: number){
            return jwt.sign({
                name,
                id,
            }, process.env.JSON_TOKEN_KEY, {
                expiresIn: 3600000
                //can also add the options of when will the key expire
            },
            );
        }

        //so the logic here is that, realtors, buyers and admin must have different login privileges
        //so the function below will fulfill the logic of the admin generating the product key, that will be specific to either the realtor/buyer to access the system

        //so basically if a user signs up as a realtor, this endpoint "generateProductKey" will
        //create a product key with email, and user type and then it will hash it and salt it too!!
        generateProductKey(email: string, userType: UserType){
            const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

            return bcrypt.hash(string, 10);
        }
    }

    

