import { Module } from "@nestjs/common";
import { donorController } from "./donor.controller";
import { donorService } from "./donor.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { donorEntity } from "./donor.entity";
import { AuthGuard } from "./guards/auth.guard";

@Module({
    imports: [TypeOrmModule.forFeature([donorEntity])],
    controllers: [donorController],
    providers: [donorService, AuthGuard],
    exports: [donorService],
})
export class donorModule{}