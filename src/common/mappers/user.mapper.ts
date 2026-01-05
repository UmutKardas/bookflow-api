import { BookType, ProviderType } from "src/generated/prisma/client";
import { UserProfileResponseDto } from "src/modules/user/dto/user.profile.response.dto";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { BookMapper } from "./book.mapper";
import { AuthRegisterDto } from "src/modules/auth/dto/auth.register.dto";
import { CreateUserData } from "src/modules/user/contracts/create-user.data";
import { AuthLoginDto } from "src/modules/auth/dto/auth.login.dto";

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

    static registerDtoToCreateInput(data: AuthRegisterDto, overrides: Partial<CreateUserData> = {}): CreateUserData {
        return {
            email: data.email,
            name: data.name,
            password: data.password ?? null,
            provider: data.provider as ProviderType,
            providerId: data.providerId ?? null,
            ...overrides
        }
    }

    static loginDtoToCreateInput(data: AuthLoginDto, overrides: Partial<CreateUserData> = {}): CreateUserData {
        return {
            email: data.email ?? "",
            name: "Anonymous",
            password: data.password,
            provider: data.provider as ProviderType,
            providerId: data.providerId,
            ...overrides
        }
    }
}