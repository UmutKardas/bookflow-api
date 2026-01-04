import * as jwt from "jsonwebtoken"
import { env } from "src/config/env"

export interface AccessTokenPayload extends jwt.JwtPayload {
    userId: string
}

export function generateToken(userId: string): string {
    return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '1h' });
}

export function generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AccessTokenPayload {
    return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
}

export function verifyRefreshToken(refreshToken: string): AccessTokenPayload {
    return jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as AccessTokenPayload;
}