import { HttpStatus, Injectable } from "@nestjs/common";
import { AuthLoginDto } from "../dto/auth.login.dto";
import { AuthRegisterDto } from "../dto/auth.register.dto";
import { BaseAuthProvider } from "./base.auth.provider";
import { AuthResponseDto } from "../dto/auth.response.dto";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthTokenService } from "../auth.token.service";
import { UserService } from "src/modules/user/user.service";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { compare } from "src/common/crypto/bcrypt.utils";

@Injectable()
export class EmailProvider extends BaseAuthProvider {
    constructor(
        protected readonly authTokenService: AuthTokenService,
        private readonly userService: UserService
    ) {
        super(authTokenService);
    }

    async validateRegister(data: AuthRegisterDto): Promise<AuthResponseDto> {
        if (!data.email) {
            throw new AppException("Email is required for registration");
        }

        if (!data.password) {
            throw new AppException("Password is required for registration");
        }

        if (!data.name) {
            throw new AppException("Name is required for registration");
        }

        const existingUser = await this.userService.getUniqueUser({ email: data.email });

        if (existingUser) {
            throw new AppException("Email already in use", "", HttpStatus.CONFLICT)
        }

        const user: UserEntity = await this.userService.create(data);
        return this.generateAuthResponse(user);
    }

    async validateLogin(data: AuthLoginDto): Promise<AuthResponseDto> {
        if (!data.email) {
            throw new AppException("Email is required for login");
        }

        if (!data.password) {
            throw new AppException("Password is required for login");
        }

        const existingUser = await this.userService.getUniqueUser({ email: data.email });

        if (!existingUser) {
            throw new AppException("Invalid email or password", "", HttpStatus.UNAUTHORIZED);
        }

        const passwordMatch = await compare(data.password, existingUser.password || "");

        if (!passwordMatch) {
            throw new AppException("Invalid email or password", "", HttpStatus.UNAUTHORIZED);
        }

        return this.generateAuthResponse(existingUser);
    }

}