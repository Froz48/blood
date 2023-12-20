import { IsNotEmpty } from "class-validator";

export class facilityWithBloodDto{
    @IsNotEmpty()
    blood: string[]
}