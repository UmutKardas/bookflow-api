import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/modules/user/user.module";
import { RedisModule } from "src/redis/redis.module";
import { AuthTokenService } from "./auth.token.service";
import { JwtStrategies } from "./strategies/jwt.strategies";

@Module({
    imports: [UserModule, RedisModule],
    controllers: [AuthController],
    providers: [AuthService, AuthTokenService, JwtStrategies],
})

export class AuthModule { }