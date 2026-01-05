import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/common/decarators/user.decarator";
import type { UserEntity } from "../user/entities/user.entity";
import { AuthService } from "./auth.service";
import { AuthRegisterDto } from "./dto/auth.register.dto";
import { AuthResponseDto } from "./dto/auth.response.dto";
import { AuthLoginDto } from "./dto/auth.login.dto";
import { AuthTokenService } from "./auth.token.service";
import { AuthRefreshDto } from "./dto/auth.refresh.dto";
import { AuthRefreshResponseDto } from "./dto/auth.refresh.response.dto";
import { JWT_AUTH_SKIP } from "src/common/decarators/jwt-auth.skip.decarator";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly authTokenService: AuthTokenService
    ) { }

    @JWT_AUTH_SKIP
    @Post("register")
    async register(@Body() authRegisterDto: AuthRegisterDto): Promise<AuthResponseDto> {
        return await this.authService.register(authRegisterDto);
    }

    @JWT_AUTH_SKIP
    @Post("login")
    async login(@Body() authLoginDto: AuthLoginDto): Promise<AuthResponseDto> {
        return await this.authService.login(authLoginDto);
    }

    @JWT_AUTH_SKIP
    @Post("refresh-token")
    async refreshToken(@Body() authRefreshDto: AuthRefreshDto): Promise<AuthRefreshResponseDto> {
        return await this.authTokenService.updateRefreshToken(authRefreshDto.userId, authRefreshDto.refreshToken);
    }

    @Post("logout")
    async logout(@User() user: UserEntity): Promise<boolean> {
        return await this.authService.logout(user.id);
    }
}