/* eslint-disable prettier/prettier */
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

export class UserInterceptor implements NestInterceptor {

    async intercept(
        context: ExecutionContext, handler: CallHandler
    ){

        //any code that is to be put here will be intercepting the request

        const request = context.switchToHttp().getRequest();

        //trying to console log the token, by extracting the token request, its headers and the token key which is 'authorization'
        //now that we want to specifically extract the token from the authorization key we can extaract it by using split
        //now the cool typescript trick to find if the authorization key is defined or not defined is to use the question mark (?), in order
        //to search if there is existing request or headers.
        const token = request?.headers?.authorization?.split('Bearer ')[1];
        const user = await jwt.decode(token);
        request.user = user;
        //you console log the request in an object
        // console.log({ user })

        return handler.handle(
            ///any code that is to be put here will be intercepting the response
        )
    }
}