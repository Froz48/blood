import { expressRequestInterface } from "@app/types/expressRequest.interface";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const Donor = 
    createParamDecorator((data: any, ctx: 
    ExecutionContext)=>{        const request = ctx.switchToHttp().getRequest<expressRequestInterface>()
        if (!request.donor){
        return null
    }

    if (data){
        return request.donor[data]
    }

    return request.donor
})