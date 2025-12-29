import { Expose, Type } from "class-transformer";
import { UserProfileResponseDto } from "src/user/dto/user.profile.response.dto";

export class AuthResponseDto {
    @Expose()
    @Type(() => UserProfileResponseDto)
    user: UserProfileResponseDto;

    @Expose()
    token: string;

    @Expose()
    refreshToken: string;
}