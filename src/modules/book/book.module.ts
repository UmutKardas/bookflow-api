import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { ElasticModule } from "src/infra/elastic/elastic.module";
import { BookElasticService } from "./book-elastic.service";

@Module({
    imports: [ElasticModule],
    controllers: [BookController],
    providers: [BookService, BookElasticService]
})

export class BookModule { }