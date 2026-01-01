import { BookType } from 'src/generated/prisma/client';
import { UserEntity } from 'src/modules/user/entities/user.entity';


export interface BookEntity {
    id: string;
    bookName: string;
    authorName: string;
    coverImageUrl?: string | null;
    totalPages: number;
    startDate: Date;
    endDate?: Date | null;
    bookType: BookType;
    rating?: number | null;

    user?: UserEntity | null;
    userId?: string | null;

    createdAt: Date;
    updatedAt: Date;
}
