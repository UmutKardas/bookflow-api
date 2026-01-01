import { BookResponseDto } from "src/modules/book/dto/book.response.dto";
import { BookEntity } from "src/modules/book/entities/book.entity";

export class BookMapper {
    static toBookResponseDto(book: BookEntity): BookResponseDto {
        return {
            id: book.id,
            bookName: book.bookName,
            authorName: book.authorName,
            coverImageUrl: book.coverImageUrl ?? undefined,
            totalPages: book.totalPages,
            startDate: book.startDate,
            endDate: book.endDate ?? undefined,
            bookType: book.bookType,
            rating: book.rating ?? undefined,
        };
    }
}