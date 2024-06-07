/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UnauthorizedException} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto, HomeResponseDto, UpdateHomeDto } from './dto/dto/home.dto';
import { propertyType } from '@prisma/client';
import { User, UserInfo } from 'src/user/decorators/user.decorator';

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService){}

    //get homes endpoint controller
    @Get()
    getHomes(
        @Query('city') city?: string,
        @Query('minPrice') minPrice?: string,
        @Query('maxPrice') maxPrice?: string,
        @Query('propertyType') propertyType?: propertyType,
    
    ): Promise<HomeResponseDto[]>{

        // USE OF TERNARY CONDITION
        //so here if we defined either the minprice or the maxprice then we shall create an object
        const price = minPrice || maxPrice ? {
            //so the logic here is that if the minPrice is provided, then it will parsed in float if its gte(greater than or equal to 'minPrice')
            //so the logic here is that if the maxPrice is provided, then it will parsed in float if its lte(less than or equal to 'maxPrice')
            ...(minPrice && {gte: parseFloat(minPrice)}),
            ...(maxPrice && {gte: parseFloat(maxPrice)}),
        } : undefined //or if non the maxPrice or minPrice is defined, then it will return undefined
        //lets filter homes
        const filters = {
            //we want to destruct such that if a city is defined, then we shall render the city ibject and the structure

         ...(city && {city}),
         ...(price && {price}),
         ...(propertyType && {propertyType}),
        }
        return this.homeService.getHomes(filters);
    }


    //get home by id controller 
    @Get(':id')
    getHome(@Param('id', ParseIntPipe) id: number){
        return this.homeService.getHomeById(id);
    }

    //post a new home
    @Post()
    createHome(@Body() body: CreateHomeDto, @User() user:UserInfo){
        return this.homeService.createHome(body, user.id)
    }

    //update a home by id
    @Put(":id")
    async updateHome(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: UpdateHomeDto,
        @User() user:UserInfo
    ){
        const realtor = await this.homeService.getRealtorByHomeId(id);
        if(realtor.id !== user.id){
            throw new UnauthorizedException()
        }
        return this.homeService.updateHomeById(id, body)
    }

    //delete a home by id
    @Delete(":id")
    async deleteHome(
        @Param('id', ParseIntPipe) id: number,
        @User() user:UserInfo){
            const realtor = await this.homeService.getRealtorByHomeId(id);
            if(realtor.id !== user.id){
                throw new UnauthorizedException()
            }
        return this.homeService.deleteHomeById(id);

        //so were going to cook a deletehome without restriction of foreign key constraint from images table
    }
}
