import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { donationService } from './donation.service';
import { promises } from 'dns';
import { donationEntity } from './donation.entity';
import { createDonationDto } from './dto/createDonationDto.dto';
import { Donor } from '@app/donor/decorators/donor.decorator';
import { donorEntity } from '@app/donor/donor.entity';
import { donorService } from '../donor/donor.service';
import { donorController } from '@app/donor/donor.controller';

@Controller('donation')
export class donationController{
    constructor(private readonly donationService: donationService){}

    @ Get()
    async findAll(): Promise<{donation:number[]}>{
        const donation = await this.donationService.findAll();
        return {
            donation: donation.map(donation => donation.id),
        };
    }

    @Post()
    async createDonation(@Body('donation') createDonationDto: createDonationDto){
        
        return this.donationService.createDonation(createDonationDto)
    }
}