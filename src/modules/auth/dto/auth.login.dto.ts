import { ProviderType } from "src/generated/prisma/enums";
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class AuthLoginDto {
    @IsEnum(ProviderType)
    provider: ProviderType;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    providerId?: string;
}
