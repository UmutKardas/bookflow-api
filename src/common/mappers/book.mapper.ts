import { BookResponseDto } from "src/modules/book/dto/book.response.dto";
import { SearchBookResponseDto } from "src/modules/book/dto/search.book.response.dto";
import { BookEntity } from "src/modules/book/entities/book.entity";

export class BookMapper {
    static toBookEntity(book: any): BookEntity {
        return {
            id: book.id,
            bookName: book.bookName,
            authorName: book.authorName,
            coverImageUrl: book.coverImageUrl,
            totalPages: book.totalPages,
            startDate: book.startDate,
            endDate: book.endDate,
            bookType: book.bookType,
            rating: book.rating,
            user: book.user,
            userId: book.userId,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt
        };
    }

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