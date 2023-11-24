import { Injectable } from '@nestjs/common';
import { cityEntity } from './city.entity';
import { Repository, Column } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class cityService{
    constructor(
        @InjectRepository(cityEntity) 
        private readonly cityRepository: Repository<cityEntity>,
    ){}
    async findAll() : Promise<cityEntity[]> {
        return await this.cityRepository.find();
    }
}