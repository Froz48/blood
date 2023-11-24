import { Body, Controller, Post } from '@nestjs/common';
import { donorService } from './donor.service';
import { createDonorDto } from './dto/createDonor.dto';

@Controller()
export class donorController{
    constructor(private readonly donorService: donorService){}
    @Post('donor')
    async createDonor(@Body('donor') createDonorDto: createDonorDto): Promise<any>{
        console.log('createDonorDto', createDonorDto);
        return this.donorService.createDonor(createDonorDto);
    }
}