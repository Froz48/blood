import { IsNotEmpty } from "class-validator";

export class loginDonorDto{
    @IsNotEmpty()
    readonly username: string

    @IsNotEmpty()
    readonly password: string
}