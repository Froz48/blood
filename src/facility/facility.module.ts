import { Module } from "@nestjs/common";
import { facilityController } from "./facility.controller";
import { facilityService } from "./facility.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { facilityEntity } from "./facility.entity";

@Module({
    imports: [TypeOrmModule.forFeature([facilityEntity])],
    controllers: [facilityController],
    providers: [facilityService],
    exports: [facilityService]
})
export class facilityModule{}