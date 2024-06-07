import { HomeService } from './home.service';
import { CreateHomeDto, HomeResponseDto, UpdateHomeDto } from './dto/dto/home.dto';
import { propertyType } from '@prisma/client';
import { UserInfo } from 'src/user/decorators/user.decorator';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    getHomes(city?: string, minPrice?: string, maxPrice?: string, propertyType?: propertyType): Promise<HomeResponseDto[]>;
    getHome(id: number): Promise<HomeResponseDto>;
    createHome(body: CreateHomeDto, user: UserInfo): Promise<HomeResponseDto>;
    updateHome(id: number, body: UpdateHomeDto, user: UserInfo): Promise<HomeResponseDto>;
    deleteHome(id: number, user: UserInfo): Promise<void>;
}
