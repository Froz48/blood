import { Inject, Injectable } from '@nestjs/common';
import { donationEntity } from './donation.entity';
import { Repository, Column } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createDonationDto } from './dto/createDonationDto.dto';
import { donorService } from '@app/donor/donor.service';

@Injectable()
export class donationService{
    constructor(
        @InjectRepository(donationEntity) 
        private readonly donationRepository: Repository<donationEntity>,
        @Inject(donorService)
        private readonly donorService: donorService
    ){}

    async findAll() : Promise<donationEntity[]> {
        return await this.donationRepository.find();
    }

    async createDonation(createDonationDto: createDonationDto): Promise<donationEntity>{
        const newDonation = new donationEntity()
        newDonation.date = new Date()
        newDonation.date.setHours(0,0,0,0)
        newDonation.donor = await this.donorService.findById(createDonationDto.donorId)
        Object.assign(newDonation, createDonationDto)
        console.log('newDonation', newDonation)
        this.donorService.newDonation(createDonationDto.donorId)
        return await this.donationRepository.save(newDonation)
    }
}