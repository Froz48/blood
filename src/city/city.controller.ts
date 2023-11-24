import { Controller, Get } from '@nestjs/common';
import { cityService } from './city.service';
import { promises } from 'dns';
import { cityEntity } from './city.entity';

@Controller('city')
export class cityController{
    constructor(private readonly cityService: cityService){}
    @ Get()
    async findAll(): Promise<{city:string[]}>{
        const city = await this.cityService.findAll();
        return {
            city: city.map(city => city.city),
        };
    }

}