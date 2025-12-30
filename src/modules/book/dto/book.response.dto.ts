import { Expose } from "class-transformer";
import { BookType } from "src/generated/prisma/enums";

export class BookResponseDto {
    @Expose()
    id: string;

    @Expose()
    bookName: string;

    @Expose()
    authorName: string;

    @Expose()
    coverImageUrl?: string;

    @Expose()
    totalPages: number;

    @Expose()
    startDate: Date;

    @Expose()
    endDate?: Date;

    @Expose()
    bookType: BookType;

    @Expose()
    rating?: number;
}