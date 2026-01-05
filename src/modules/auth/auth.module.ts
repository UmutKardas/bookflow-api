import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/modules/user/user.module";
import { RedisModule } from "src/infra/redis/redis.module";
import { AuthTokenService } from "./auth.token.service";
import { JwtStrategies } from "./strategies/jwt.strategies";
import { AppleProvider } from "src/generated/prisma/internal/class";
import { GoogleProvider } from "./providers/google.provider";
import { EmailProvider } from "./providers/email.provider";

@Module({
    imports: [UserModule, RedisModule],
    controllers: [AuthController],
    providers: [AuthService, AuthTokenService, JwtStrategies, AppleProvider, GoogleProvider, EmailProvider],
})

export class AuthModule { }