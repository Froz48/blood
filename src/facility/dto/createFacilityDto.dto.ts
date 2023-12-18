import { IsNotEmpty } from "class-validator";

export class createFacilityDto{
    @IsNotEmpty()
    city: string

    address: string
}