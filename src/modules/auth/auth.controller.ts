import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/common/decarators/user.decarator";
import type { UserEntity } from "../user/entities/user.entity";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("register")
    async register() {

    }

    @Post("login")
    async login() {

    }

    @Post("refresh-token")
    async refreshToken() {

    }

    @UseGuards(AuthGuard)
    @Post("logout")
    async logout(@User() user: UserEntity): Promise<boolean> {
        return await this.authService.logout(user.id);
    }
}