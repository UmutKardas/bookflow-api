import { Injectable } from "@nestjs/common";
import { AuthTokenService } from "./auth.token.service";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthRefreshResponseDto } from "./dto/auth.refresh.response.dto";

@Injectable()
export class AuthService {
    constructor(private readonly authTokenService: AuthTokenService) { }




    async logout(userId: string): Promise<boolean> {
        if (!userId) {
            throw new AppException("Invalid user ID");
        }

        await this.authTokenService.deleteRefreshToken(userId);
        return true;
    }
}