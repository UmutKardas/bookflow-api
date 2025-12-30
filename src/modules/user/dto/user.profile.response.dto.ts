import { Expose, Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { BookResponseDto } from "src/modules/book/dto/book.response.dto";
import { BookType } from "src/generated/prisma/enums";

export class UserProfileResponseDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    profilePictureUrl?: string;

    @Expose()
    bookCount: number;

    @Expose()
    favoriteBookType?: BookType;

    @Expose()
    readingPageCount: number

    @Expose()
    @Type(() => BookResponseDto)
    books?: BookResponseDto[]
}