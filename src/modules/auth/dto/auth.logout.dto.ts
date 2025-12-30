import { IsString } from "class-validator";

export class AuthLogoutDto {
    @IsString()
    userId: string;
}