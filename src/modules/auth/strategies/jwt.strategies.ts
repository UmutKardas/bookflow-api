import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { env } from "src/config/env"
import { UserService } from "src/modules/user/user.service"
import { AppException } from "src/common/exceptions/app.exception"
import { Injectable } from "@nestjs/common"

@Injectable()
export class JwtStrategies extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            secretOrKey: env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: any) {
        const user = await this.userService.getUserById(payload.userId, true)

        if (!user) {
            throw new AppException('User not found')
        }

        return user
    }
}