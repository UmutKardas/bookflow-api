import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserEntity } from "./entities/user.entity";
import { AppException } from "src/common/exceptions/app.exception";
import { BookType, Prisma, ProviderType } from "src/generated/prisma/client";
import { UserMapper } from "src/common/mappers/user.mapper";
import { UserUpdateDto } from "./dto/user.update.dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) { }

    async getUserById(id: string, includeBooks: boolean = false): Promise<UserEntity> {
        let user = await this.prismaService.user.findUnique({
            where: {
                id: id
            },
            include: {
                userBooks: includeBooks
            }
        })

        if (!user) {
            throw new AppException('User not found')
        }

        return UserMapper.toUserEntity(user)
    }

    async update(id: string, userUpdateDto: UserUpdateDto): Promise<UserEntity> {
        try {
            const updatedUser = await this.prismaService.user.update({
                where: { id },
                data: userUpdateDto,
            });

            return UserMapper.toUserEntity(updatedUser);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new AppException(`User with id ${id} not found`);
            }
            throw error;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            await this.prismaService.user.delete({
                where: {
                    id
                }
            });
            return true;

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new AppException(`User with id ${id} not found`);
            }
            throw error;
        }
    }
}