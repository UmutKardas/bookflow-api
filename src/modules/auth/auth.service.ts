import { Injectable } from "@nestjs/common";
import { AuthTokenService } from "./auth.token.service";
import { AppException } from "src/common/exceptions/app.exception";
import { EmailProvider } from "./providers/email.provider";
import { GoogleProvider } from "./providers/google.provider";
import { AppleProvider } from "./providers/apple.provider";
import { AuthProvider } from "./contracts/auth.provider.interface";
import { ProviderType } from "src/generated/prisma/enums";
import { AuthRegisterDto } from "./dto/auth.register.dto";
import { AuthResponseDto } from "./dto/auth.response.dto";
import { AuthLoginDto } from "./dto/auth.login.dto";

@Injectable()
export class AuthService {
    private providers: Partial<Record<ProviderType, AuthProvider>> = {}

    constructor(
        private readonly authTokenService: AuthTokenService,
        emailProvider: EmailProvider,
        googleProvider: GoogleProvider,
        appleProvider: AppleProvider
    ) {
        this.providers = {
            "email": emailProvider,
            "google": googleProvider,
            "apple": appleProvider,
            "none": emailProvider
        }
    }

    async register(data: AuthRegisterDto): Promise<AuthResponseDto> {
        const provider = this.providers[data.provider]
        if (!provider) {
            throw new AppException("Invalid provider")
        }

        return await provider.validateRegister(data);
    }

    async login(data: AuthLoginDto): Promise<AuthResponseDto> {
        const provider = this.providers[data.provider]
        if (!provider) {
            throw new AppException("Invalid provider")
        }

        return await provider.validateLogin(data);
    }

    async logout(userId: string): Promise<boolean> {
        if (!userId) {
            throw new AppException("Invalid user ID");
        }

        await this.authTokenService.deleteRefreshToken(userId);
        return true;
    }
}