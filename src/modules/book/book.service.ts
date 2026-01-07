import { Injectable } from "@nestjs/common";
import { CreateBookDto } from "./dto/create.book.dto";
import { BookEntity } from "./entities/book.entity";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { AppException } from "src/common/exceptions/app.exception";
import { BookMapper } from "src/common/mappers/book.mapper";
import { UpdateBookDto } from "./dto/update.book.dto";
import { BookElasticService } from "./book-elastic.service";

@Injectable()
export class BookService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly bookElasticService: BookElasticService
    ) { }

    async getBookById(id: string): Promise<BookEntity> {
        try {
            const book = this.prismaService.book.findUnique({
                where: {
                    id
                }
            })

            if (!book) {
                throw new AppException("Book not found")
            }

            return BookMapper.toBookEntity(book)

        } catch (error) {
            throw error
        }
    }

    async create(userId: string, bookData: CreateBookDto): Promise<BookEntity> {
        try {
            const createdBook = await this.prismaService.book.create({
                data: {
                    bookName: bookData.bookName,
                    authorName: bookData.authorName,
                    coverImageUrl: bookData.coverImageUrl || null,
                    totalPages: bookData.totalPages,
                    startDate: bookData.startDate || new Date(),
                    bookType: bookData.bookType,
                    rating: bookData.rating || null,
                    userId: userId,
                }
            });

            const bookEntity = BookMapper.toBookEntity(createdBook);

            await this.bookElasticService.indexBook(bookEntity);

            return bookEntity;

        } catch (error) {
            throw error
        }
    }

    async update(id: string, userId: string, bookData: UpdateBookDto): Promise<BookEntity> {
        try {
            const book = await this.prismaService.book.findUnique({
                where: { id },
            });

            if (!book) {
                throw new AppException(`Book with id ${id} not found`);
            }

            if (book.userId !== userId) {
                throw new AppException(`You are not authorized to update this book`);
            }

            const updatedBook = await this.prismaService.book.update({
                where: { id },
                data: bookData,
            });

            const bookEntity = BookMapper.toBookEntity(updatedBook);

            await this.bookElasticService.updateBook(bookEntity);

            return bookEntity;

        } catch (error) {
            throw error
        }
    }

    async delete(id: string, userId: string): Promise<boolean> {
        try {
            const book = await this.prismaService.book.findUnique({
                where: { id },
            });

            if (!book) {
                throw new AppException(`Book with id ${id} not found`);
            }

            if (book.userId !== userId) {
                throw new AppException(`You are not authorized to update this book`);
            }

            await this.prismaService.book.delete({
                where: {
                    id
                }
            })

            await this.bookElasticService.deleteBook(id);

            return true;

        } catch (error) {
            throw error
        }
    }
}