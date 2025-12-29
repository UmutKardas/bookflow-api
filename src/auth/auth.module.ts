import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { RedisModule } from "src/redis/redis.module";
import { AuthTokenService } from "./auth.token.service";

@Module({
    imports: [UserModule, RedisModule],
    controllers: [AuthController],
    providers: [AuthService, AuthTokenService],
})

export class AuthModule { }