import { BookType, ProviderType } from "src/generated/prisma/client";
import { UserProfileResponseDto } from "src/modules/user/dto/user.profile.response.dto";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { BookMapper } from "./book.mapper";

export class UserMapper {
    static toUserEntity(user: any): UserEntity {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            provider: user.provider as ProviderType,
            providerId: user.providerId,
            password: user.password,
            profilePictureUrl: user.profilePictureUrl,
            bookCount: user.bookCount,
            favoriteBookType: user.favoriteBookType as BookType | null,
            readingPageCount: user.readingPageCount,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            userBooks: user.userBooks
        };
    }

    static toUserProfileDto(user: UserEntity): UserProfileResponseDto {
        return {
            id: user.id,
            name: user.name,
            profilePictureUrl: user.profilePictureUrl ?? undefined,
            bookCount: user.bookCount,
            favoriteBookType: user.favoriteBookType ?? undefined,
            readingPageCount: user.readingPageCount,
            books: user.userBooks?.map(x => BookMapper.toBookResponseDto(x)) ?? undefined
        }
    }
}