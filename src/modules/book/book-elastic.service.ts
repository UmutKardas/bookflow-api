import { ElasticsearchService } from "@nestjs/elasticsearch";
import { BookEntity } from "./entities/book.entity";
import { BOOK_ELASTICSEARCH_INDEX } from "src/common/constants/book.constants";

export class BookElasticService {
    constructor(private readonly elasticService: ElasticsearchService) { }

    async indexBook(book: BookEntity) {
        await this.elasticService.index({
            index: BOOK_ELASTICSEARCH_INDEX,
            id: book.id,
            document: {
                bookName: book.bookName,
                authorName: book.authorName,
                bookType: book.bookType,
                userId: book.userId
            }
        });
    }

    async updateBook(book: BookEntity) {
        await this.elasticService.update({
            index: BOOK_ELASTICSEARCH_INDEX,
            id: book.id,
            doc: {
                bookName: book.bookName,
                bookType: book.bookType
            }
        });
    }

    async deleteBook(bookId: string) {
        await this.elasticService.delete({
            index: BOOK_ELASTICSEARCH_INDEX,
            id: bookId
        });
    }

    async searchBooks(query: string) {
        const { hits } = await this.elasticService.search({
            index: BOOK_ELASTICSEARCH_INDEX,
            query: {
                multi_match: {
                    query,
                    fields: ['bookName', 'authorName']
                }
            }
        });

        return hits.hits
            .filter(hit => hit._id)
            .map(hit => ({ id: hit._id as string }));
    }
}