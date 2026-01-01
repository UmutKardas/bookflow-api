import { BookType, ProviderType } from "src/generated/prisma/client";
import { BookEntity } from "src/modules/book/entities/book.entity";

export interface UserEntity {
    id: string;
    email: string;
    name: string;
    provider: ProviderType;
    providerId: string | null;
    password: string | null;
    profilePictureUrl: string | null;
    bookCount: number;
    favoriteBookType: BookType | null;
    readingPageCount: number;
    createdAt: Date;
    updatedAt: Date;
    userBooks?: [BookEntity]
}
