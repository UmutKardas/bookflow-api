import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { ProviderType } from "src/generated/prisma/enums";

export class AuthRegisterDto {
    @IsEnum(ProviderType)
    provider: ProviderType;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    providerId: string;
}