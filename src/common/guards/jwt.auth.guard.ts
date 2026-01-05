import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { JWT_AUTH_SKIP } from "../decarators/jwt-auth.skip.decarator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const jwtAuthSkip = this.reflector.getAllAndOverride<boolean>(JWT_AUTH_SKIP, [context.getHandler(), context.getClass()])

        if (jwtAuthSkip) {
            return true;
        }

        return super.canActivate(context);
    }
}