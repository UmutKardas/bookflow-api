import { IsString } from "class-validator";

export class AuthRefreshDto {
    @IsString()
    userId: string;

    @IsString()
    refreshToken: string;
}