import { expressRequestInterface } from "@app/types/expressRequest.interface";
import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";


@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<expressRequestInterface>()
        if (request.donor){
            return true
        }

        throw new HttpException('Not authorized', 401)

    }
}