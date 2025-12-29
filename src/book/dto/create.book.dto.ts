import { IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";
import { BookType } from "src/generated/prisma/enums";

export class CreateBookDto {
    @IsString()
    bookName: string;

    @IsString()
    authorName: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    coverImageUrl?: string

    @IsNumber()
    totalPages: number;

    @IsOptional()
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @IsEnum(BookType)
    bookType: BookType

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating?: number
}