import { Injectable } from "@nestjs/common";
import { User } from "src/generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) { }

    async getUserById(id: string) {
        return await this.prismaService.user.findUnique({
            where: {
                id: id
            }
        })
    }
}