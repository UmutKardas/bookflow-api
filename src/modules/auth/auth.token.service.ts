import { Injectable } from "@nestjs/common";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class AuthTokenService {
    constructor(private readonly redisService: RedisService) { }

    async rotateRefreshToken(userId: string, oldRefreshToken) {

    }

    async saveRefreshToken(userId: string, refreshToken: string): Promise<string | null> {
        const key = `refresh_token:${userId}`
        return await this.redisService.set(key, refreshToken, "EX", 7 * 24 * 60 * 60)
    }

    async getRefreshToken(userId: string): Promise<string | null> {
        const key = `refresh_token:${userId}`
        return await this.redisService.get(key)
    }

    async deleteRefreshToken(userId: string) {
        const key = `refresh_token:${userId}`
        await this.redisService.del(key)
    }
}