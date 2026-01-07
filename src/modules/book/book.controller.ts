import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { CreateBookDto } from "./dto/create.book.dto";
import { BookResponseDto } from "./dto/book.response.dto";
import { BookService } from "./book.service";
import { User } from "src/common/decarators/user.decarator";
import type { UserEntity } from "../user/entities/user.entity";
import { BookMapper } from "src/common/mappers/book.mapper";
import { UpdateBookDto } from "./dto/update.book.dto";
import { BookElasticService } from "./book-elastic.service";
import { SearchBookResponseDto } from "./dto/search.book.response.dto";

@Controller("book")
export class BookController {
    constructor(
        private readonly bookService: BookService,
        private readonly bookElasticService: BookElasticService
    ) { }

    @Post('create')
    async createBook(@Body() createBookDto: CreateBookDto, @User() user: UserEntity): Promise<BookResponseDto> {
        const createdBook = await this.bookService.create(user.id, createBookDto)
        return BookMapper.toBookResponseDto(createdBook);
    }

    @Get('/:id')
    async getbook(@Param('id') id: string): Promise<BookResponseDto> {
        const book = await this.bookService.getBookById(id);
        return BookMapper.toBookResponseDto(book);
    }

    @Post('update/:id')
    async updateBook(@Body() updateBookDto: UpdateBookDto, @Param('id') id: string, @User() user: UserEntity): Promise<BookResponseDto> {
        const updatedBook = await this.bookService.update(id, user.id, updateBookDto)
        return BookMapper.toBookResponseDto(updatedBook);
    }

    @Post('delete/:id')
    async deleteBook(@Param('id') id: string, @User() user: UserEntity): Promise<boolean> {
        await this.bookService.delete(id, user.id);
        return true;
    }

    @Get('search')
    async searchBook(@Query('q') query: string): Promise<SearchBookResponseDto> {
        const results = await this.bookElasticService.searchBooks(query);

        return {

            ids: results.map(result => result.id)
        };
    }
}