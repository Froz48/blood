import { JWT_SECRET } from "@app/config";
import { expressRequestInterface } from "@app/types/expressRequest.interface";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { donorService } from '../donor.service';

@Injectable()
export class authMiddleware implements NestMiddleware {
    constructor(private readonly donorService: donorService){}
    async use (req: expressRequestInterface, res: Response, next: NextFunction){
        if (!req.headers.authorization){
            req.donor = null
            next()
            return
        }
        const token = req.headers.authorization.split(' ')[1]

        try {
            const decode = verify(token, JWT_SECRET)
            const donor = await this.donorService.findById(decode.id)
            req.donor = donor
            next()            
        } catch (err){
            req.donor = null
            next()
        }
    }

}