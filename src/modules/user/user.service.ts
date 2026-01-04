import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserEntity } from "./entities/user.entity";
import { AppException } from "src/common/exceptions/app.exception";
import { BookType, Prisma, ProviderType } from "src/generated/prisma/client";
import { UserMapper } from "src/common/mappers/user.mapper";
import { UserUpdateDto } from "./dto/user.update.dto";
import { AuthRegisterDto } from "../auth/dto/auth.register.dto";
import { hash } from "src/common/crypto/bcrypt.utils";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) { }

    async getUniqueUser(where: Prisma.UserWhereUniqueInput, includeBooks: boolean = false): Promise<UserEntity | null> {
        try {
            const user = await this.prismaService.user.findUnique({
                where,
                include: {
                    userBooks: includeBooks
                }
            });

            return user ? UserMapper.toUserEntity(user) : null
        } catch (error) {
            throw error
        }
    }

    async create(data: AuthRegisterDto): Promise<UserEntity> {
        try {
            const user = await this.prismaService.user.create({
                data: {
                    ...data,
                    password: data.password ? await hash(data.password) : null
                }
            })

            return UserMapper.toUserEntity(user)

        } catch (error) {
            if (error.code === "P2002") {
                throw new AppException("Email already in use", error.message);
            }
            throw new AppException("Failed to create user", error.message);
        }
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