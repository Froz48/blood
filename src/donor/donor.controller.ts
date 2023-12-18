import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { donorService } from './donor.service';
import { createDonorDto } from './dto/createDonor.dto';
import { donorResponseInterface } from './types/donorResponse.Interface';
import { loginDonorDto } from './dto/login.dto';
import { Request } from 'express';
import { expressRequestInterface } from '@app/types/expressRequest.interface';
import { Donor } from './decorators/donor.decorator';
import { donorEntity } from './donor.entity';
import { AuthGuard } from './guards/auth.guard';
import { updateDonorDto } from './dto/updateDonor.dto';
import { createDonationDto } from '@app/donation/dto/createDonationDto.dto';
import { facilityService } from '@app/facility/facility.service';

@Controller()
export class donorController{
    constructor(private readonly donorService: donorService,
        private readonly facilityService: facilityService){}

    @Post('donor')
    @UsePipes(new ValidationPipe())
    async createDonor(@Body('donor') createDonorDto: createDonorDto): Promise<donorResponseInterface>{
        const donor = await this.donorService.createDonor(createDonorDto);
        return this.donorService.buildDonorResponse(donor);
    }

    @Post('donor/login')
    @UsePipes(new ValidationPipe())
    async login(@Body('donor') loginDonorDto: loginDonorDto): Promise<donorResponseInterface>{
        const donor = await this.donorService.login(loginDonorDto)
        return this.donorService.buildDonorResponse(donor)
    }

    @Get('donor')
    @UseGuards(AuthGuard)
    async currentDonor(
        @Donor() donor: donorEntity,
        ): Promise<donorResponseInterface>{
        return this.donorService.buildDonorResponse(donor)
    }

    @Get('facilities')
    @UseGuards(AuthGuard)
    async facilitiesInCity(@Donor('city') dc: string){
        return this.donorService.facilitiesByCity(dc)
    }

    @Get('facilities/myblood')
    @UseGuards(AuthGuard)
    async facilitiesWithMyBlood(@Donor('bloodType') bt: string){
        return this.facilityService.getFacilitiesWithBlood(bt)
        
    }

    @Get('donor/nextDonationDate')
        async nextDonationDate(@Body()dto: createDonationDto){
        return this.donorService.nextDonationDate(dto.donorId)
    }

    @Put('donor')
    @UseGuards(AuthGuard)
    async updateCurrentDonor(
            @Donor('id') currentDonorId: number, 
            @Body('donor') updateDonorDto: updateDonorDto): 
            Promise<donorResponseInterface>{
        const donor = await this.donorService.updateDonor(currentDonorId, updateDonorDto)
        return this.donorService.buildDonorResponse(donor)
    };
}