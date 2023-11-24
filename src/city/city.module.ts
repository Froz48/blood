import { Module } from "@nestjs/common";
import { cityController } from "./city.controller";
import { cityService } from "./city.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { cityEntity } from "./city.entity";

@Module({
    imports: [TypeOrmModule.forFeature([cityEntity])],
    controllers: [cityController],
    providers: [cityService]
})
export class cityModule{}