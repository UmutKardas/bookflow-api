import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/common/guards/jwt.auth.guard";
import { CreateBookDto } from "./dto/create.book.dto";
import { BookResponseDto } from "./dto/book.response.dto";
import { BookService } from "./book.service";
import { User } from "src/common/decarators/user.decarator";
import type { UserEntity } from "../user/entities/user.entity";
import { BookMapper } from "src/common/mappers/book.mapper";
import { UpdateBookDto } from "./dto/update.book.dto";

@Controller("book")
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createBook(@Body() createBookDto: CreateBookDto, @User() user: UserEntity): Promise<BookResponseDto> {
        const createdBook = await this.bookService.create(user.id, createBookDto)
        return BookMapper.toBookResponseDto(createdBook);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getbook(@Param('id') id: string): Promise<BookResponseDto> {
        const book = await this.bookService.getBookById(id);
        return BookMapper.toBookResponseDto(book);
    }

    @UseGuards(JwtAuthGuard)
    @Post('update/:id')
    async updateBook(@Body() updateBookDto: UpdateBookDto, @Param('id') id: string, @User() user: UserEntity): Promise<BookResponseDto> {
        const updatedBook = await this.bookService.update(id, user.id, updateBookDto)
        return BookMapper.toBookResponseDto(updatedBook);
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete/:id')
    async deleteBook(@Param('id') id: string, @User() user: UserEntity): Promise<boolean> {
        await this.bookService.delete(id, user.id);
        return true;
    }
}