import { Injectable } from '@nestjs/common';
import { createDonorDto } from './dto/createDonor.dto';


@Injectable()
export class donorService{
    async createDonor(createDto: createDonorDto){
        return createDto;
    }
}