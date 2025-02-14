import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from "@prisma/client";
interface SignUpParams {
    email: string;
    password: string;
    name: string;
    phone: string;
}
interface SigninParams {
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    signup({ email, password, phone, name }: SignUpParams, userType: UserType): Promise<string>;
    signin({ email, password }: SigninParams): Promise<string>;
    private generateJWT;
    generateProductKey(email: string, userType: UserType): Promise<string>;
}
export {};
