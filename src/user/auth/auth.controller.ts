/* eslint-disable prettier/prettier */
import { Controller,Post, Body, Get, Param, UnauthorizedException, ParseEnumPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto, generateProductKeyDto } from '../dtos/dtos/auth.dto';
import { UserType } from '@prisma/client';
import * as bcrypt from "bcryptjs";
import { User, UserInfo } from '../decorators/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('/signup/:userType')
     async signup(
        //now here we can parse the enum types that will check the usertype of those signing up either if its a realor/admin/buyer
        @Body() body: SignupDto, @Param('userType', new ParseEnumPipe(UserType)) userType: UserType
    ){
        //if the signup guy isn't a buyer then he has to parse a product key, when it doesn't parse
        //then it will throw an 'UnauthorizedException' error
        if(userType !== UserType.BUYER){
            //if you dont provide a productKey as signingup as either Admin or Realtor then we will grant you the Unauthorized Exception!!
            if(!body.productKey){
                throw new UnauthorizedException()
            }

            //so here we recreate the productkey and compare it with the one
            //provided by the user trying to signup as a usertype
            const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`

            const isValidProductKey = await bcrypt.compare(validProductKey, body.productKey)

            if(!isValidProductKey){
                throw new UnauthorizedException()
            }
        }
        return this.authService.signup(body, userType);
    }

    //this is the 'signin' endpoint
    @Post("/signin")
    signin(@Body() body: SigninDto){
        return this.authService.signin(body);
    }

    //this is the 'generateProductkey' endpoint 
    @Post("/key")
    generateProductKey(@Body() {userType, email}: generateProductKeyDto){
        return this.authService.generateProductKey(email, userType);
    }

    @Get("/me")
    me( @User() user: UserInfo){
      return user;
    }

}




