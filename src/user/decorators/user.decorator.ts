/* eslint-disable prettier/prettier */
import { ExecutionContext, createParamDecorator} from "@nestjs/common";

export interface UserInfo {
    name:string,
    iat:number,
    id:number,
    exp:number 
}

export const User = createParamDecorator((data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
})