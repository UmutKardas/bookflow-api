import { UserEntity } from "src/modules/user/entities/user.entity";
import { AuthProvider } from "../contracts/auth.provider.interface";
import { AuthLoginDto } from "../dto/auth.login.dto";
import { AuthRegisterDto } from "../dto/auth.register.dto";
import { AuthResponseDto } from "../dto/auth.response.dto";
import { generateRefreshToken, generateToken } from "src/common/jwt/jwt.utils";
import { AuthTokenService } from "../auth.token.service";
import { UserProfileResponseDto } from "src/modules/user/dto/user.profile.response.dto";
import { UserMapper } from "src/common/mappers/user.mapper";

export abstract class BaseAuthProvider implements AuthProvider {
    constructor(protected readonly authTokenService: AuthTokenService) { }

    abstract validateRegister(data: AuthRegisterDto): Promise<AuthResponseDto>
    abstract validateLogin(data: AuthLoginDto): Promise<AuthResponseDto>

    protected async generateAuthResponse(user: UserEntity): Promise<AuthResponseDto> {
        const accessToken = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        await this.authTokenService.saveRefreshToken(user.id, refreshToken)
        const userProfile: UserProfileResponseDto = UserMapper.toUserProfileDto(user);

        return {
            user: userProfile,
            token: accessToken,
            refreshToken: refreshToken
        }
    }

}