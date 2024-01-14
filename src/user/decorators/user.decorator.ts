/* eslint-disable prettier/prettier */
import {CallHandler, ExecutionContext, NestInterceptor, createParamDecorator} from "@nestjs/common";

//now lets create the custom User interceptor that implements NestInterceptor

export class UserInterceptor implements NestInterceptor {
    //lets create an intercept method
    intercept(context: ExecutionContext, handler: CallHandler){

        //the switchToHttp context can handle multiple ways of transferring information
        const request = context.switchToHttp().getRequest();

        //we can extract the toke, with its headers, request and authorization(the main key we want)
        const token = request.headers.authorization;
        console.log({ token })

        //any code written here will be intercepting the request
        return handler.handle(
             //any code written here will be intercepting the response
        )
    }
} 

export const User = createParamDecorator(() => {
    return {
        id: 4,
        name: "Laith"
    }
})