import { IsNotEmpty } from "class-validator";

export class updateDonorDto{
    readonly username : string;
    readonly bloodType: string;
    readonly city: string;
}