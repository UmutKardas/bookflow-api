import { Injectable } from "@nestjs/common";
import { AppException } from "src/common/exceptions/app.exception";
import { generateRefreshToken, generateToken } from "src/common/jwt/jwt.utils";
import { RedisService } from "src/infra/redis/redis.service";
import { AuthRefreshResponseDto } from "./dto/auth.refresh.response.dto";

@Injectable()
export class AuthTokenService {
    constructor(private readonly redisService: RedisService) { }

    async updateRefreshToken(userId: string, oldRefreshToken: string): Promise<AuthRefreshResponseDto> {
        const key = `refresh_token:${userId}`
        const storedRefreshToken = await this.redisService.get(key)

        if (!storedRefreshToken || storedRefreshToken !== oldRefreshToken) {
            throw new AppException("Invalid refresh token")
        }

        const newAccessToken = generateToken(userId)
        const newRefreshToken = generateRefreshToken(userId)

        await this.deleteRefreshToken(userId)
        await this.saveRefreshToken(userId, newRefreshToken)

        return {
            token: newAccessToken,
            refreshToken: newRefreshToken
        }
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