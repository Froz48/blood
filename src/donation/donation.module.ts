import { Module } from "@nestjs/common";
import { donationController } from "./donation.controller";
import { donationService } from "./donation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { donationEntity } from "./donation.entity";
import { donorService } from "@app/donor/donor.service";
import { donorModule } from "@app/donor/donor.module";

@Module({
    imports: [TypeOrmModule.forFeature([donationEntity]), donorModule],
    controllers: [donationController],
    providers: [donationService],
    exports:[donationService]
})
export class donationModule{}