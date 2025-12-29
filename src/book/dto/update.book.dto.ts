import { IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";
import { BookType } from "src/generated/prisma/enums";

export class UpdateBookDto {
    @IsString()
    bookId: string;

    @IsOptional()
    @IsString()
    bookName?: string;

    @IsOptional()
    @IsString()
    authorName?: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    coverImageUrl?: string

    @IsOptional()
    @IsNumber()
    totalPages?: number;

    @IsOptional()
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @IsDate()
    endDate?: Date;

    @IsOptional()
    @IsEnum(BookType)
    bookType?: BookType

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating?: number
}