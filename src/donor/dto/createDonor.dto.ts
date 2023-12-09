import { IsNotEmpty } from "class-validator";

export class createDonorDto{
    @IsNotEmpty()
    readonly username : string;
    
    @IsNotEmpty()
    readonly password : string;
}