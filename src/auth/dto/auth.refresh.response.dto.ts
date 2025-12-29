import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class AuthRefreshResponseDto {
    @Expose()
    token: string;

    @Expose()
    refreshToken: string;
}