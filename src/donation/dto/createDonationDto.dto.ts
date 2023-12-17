import { IsNotEmpty } from "class-validator";
import { donorEntity } from '../../donor/donor.entity';


export class createDonationDto{

    @IsNotEmpty()
    readonly donorId: number

}