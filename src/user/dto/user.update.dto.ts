import { IsEnum, IsOptional, IsString, IsUrl, MinLength } from "class-validator";
import { BookType } from "src/generated/prisma/enums";

export class UserUpdateDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string

    @IsOptional()
    @IsString()
    @IsUrl()
    profilePictureUrl?: string

    @IsOptional()
    @IsEnum(BookType)
    favoriteBookType?: BookType
}