import { Injectable } from "@nestjs/common";
import { facilityEntity } from "./facility.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class facilityService{
    constructor(
        @InjectRepository(facilityEntity) 
        private readonly facilityRepository: Repository<facilityEntity>, 
        ){}

    async findById(id: number): Promise<facilityEntity>{
        return await this.facilityRepository.findOneBy({id:id})
    }

    async updateNeededBlodd(facilityId: number, str: string){
        const fac = await this.findById(facilityId)
        fac.neededBlood = str
        return await this.facilityRepository.save(fac)
    }

    async getFacilitiesWithBlood(str: string): Promise<facilityEntity[]>{
        const facilities = await this.facilityRepository.find()
        const res: facilityEntity[] = []

        for (const facility of facilities){
            if (facility.neededBlood.includes(str)){
                res.push(facility)
            }
        }
        return res
    }

    async getFacilitiesByCity(str: string): Promise<facilityEntity[]>{
        return await this.facilityRepository.findBy({city: str})
    }

}