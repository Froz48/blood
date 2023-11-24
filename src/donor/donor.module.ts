import { Module } from "@nestjs/common";
import { donorController } from "./donor.controller";
import { donorService } from "./donor.service";

@Module({
    controllers: [donorController],
    providers: [donorService],
})
export class donorModule{}