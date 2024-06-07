import { AuthService } from './auth.service';
import { SigninDto, SignupDto, generateProductKeyDto } from '../dtos/dtos/auth.dto';
import { UserType } from '@prisma/client';
import { UserInfo } from '../decorators/user.decorator';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: SignupDto, userType: UserType): Promise<string>;
    signin(body: SigninDto): Promise<string>;
    generateProductKey({ userType, email }: generateProductKeyDto): Promise<string>;
    me(user: UserInfo): UserInfo;
}
