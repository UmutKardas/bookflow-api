import { Injectable } from "@nestjs/common";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class AuthTokenService {
    constructor(private readonly redisService: RedisService) { }

    async saveRefreshToken(userId: string, refreshToken: string) {
        const key = `refresh_token:${userId}`
        await this.redisService.set(key, refreshToken, "EX", 7 * 24 * 60 * 60)
    }

    async getRefreshToken(userId: string) {
        const key = `refresh_token:${userId}`
        await this.redisService.get(key)
    }

    async deleteRefreshToken(userId: string) {
        const key = `refresh_token:${userId}`
        await this.redisService.del(key)
    }
}