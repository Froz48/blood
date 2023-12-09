import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createDonorDto } from './dto/createDonor.dto';
import { donorEntity } from './donor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { donorResponseInterface } from './types/donorResponse.Interface';
import { loginDonorDto } from './dto/login.dto';
import {compare} from 'bcrypt'
import { JWT_SECRET } from '@app/config';
import { updateDonorDto } from './dto/updateDonor.dto';

@Injectable()
export class donorService{
    constructor(
        @InjectRepository(donorEntity) 
        private readonly donorRepository: Repository<donorEntity>,
        ){}

    async createDonor(createDonorDto: createDonorDto) : Promise<donorEntity>{
        const donorByUsername = await this.donorRepository.findOneBy({
            username : createDonorDto.username,
        })
        if (donorByUsername){
            throw new HttpException('Username is taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const newDonor = new donorEntity();
        Object.assign(newDonor, createDonorDto);
        console.log('newDonor', newDonor);
        return await this.donorRepository.save(newDonor);
    }

    async login(loginDonorDto: loginDonorDto): Promise<donorEntity>{
        const donor = await this.donorRepository.findOne({
            where: {username: loginDonorDto.username},
            select: ['id', 'username', 'isHonorable', 'password']
        })
        if (!donor) throw new HttpException('Wrong username', HttpStatus.UNPROCESSABLE_ENTITY);

        const isPasswordCorrect = await compare(loginDonorDto.password, donor.password);
        if (!isPasswordCorrect) throw new HttpException('Wrong password', HttpStatus.UNPROCESSABLE_ENTITY);
        delete donor.password
        return donor
    }

    async findById(id: number): Promise<donorEntity>{
        return this.donorRepository.findOneBy({id : id})
    }

    async updateDonor(donorId: number, updateDonorDto: updateDonorDto): Promise<donorEntity> {
        const donor = await this.findById(donorId)
        Object.assign(donor, updateDonorDto)
        return await this.donorRepository.save(donor)
    }

    generateJwt(donor : donorEntity): string {
        return sign({
            id : donor.id,
            username : donor.username,
        }, JWT_SECRET);
    }

    buildDonorResponse(donor : donorEntity) : donorResponseInterface {
        return {
            donor : {
                ...donor,
                token: this.generateJwt(donor)
            }
        }
    }
}