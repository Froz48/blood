import { donorEntity } from "@app/donor/donor.entity";
import { Request } from "express";

export interface expressRequestInterface extends Request{
    donor?: donorEntity
}