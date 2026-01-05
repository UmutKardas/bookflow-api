import { Injectable } from "@nestjs/common";
import { AuthLoginDto } from "../dto/auth.login.dto";
import { AuthRegisterDto } from "../dto/auth.register.dto";
import { BaseAuthProvider } from "./base.auth.provider";
import { AuthResponseDto } from "../dto/auth.response.dto";
import { AppException } from "src/common/exceptions/app.exception";
import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import { env } from "src/config/env";
import { AuthTokenService } from "../auth.token.service";
import { UserService } from "src/modules/user/user.service";
import { CreateUserData } from "src/modules/user/contracts/create-user.data";
import { UserMapper } from "src/common/mappers/user.mapper";


@Injectable()
export class AppleProvider extends BaseAuthProvider {

    private readonly appleJwksClient = jwksClient({
        jwksUri: 'https://appleid.apple.com/auth/keys',
    });

    private readonly ISSUER = 'https://appleid.apple.com';

    constructor(authTokenService: AuthTokenService, userService: UserService) {
        super(authTokenService, userService);
    }

    async validateRegister(data: AuthRegisterDto): Promise<AuthResponseDto> {
        if (!data.providerId) {
            throw new AppException("Provider ID is required for Apple registration");
        }

        const appleUser = await this.verifyAppleToken(data.providerId);

        if (!appleUser.email) {
            throw new AppException("Apple account does not have an email");
        }

        const createUserData: CreateUserData = UserMapper.registerDtoToCreateInput(data, {
            email: appleUser.email,
            providerId: appleUser.sub || undefined
        });

        return await this.createOrRetrieveUser(createUserData);
    }

    async validateLogin(data: AuthLoginDto): Promise<AuthResponseDto> {
        if (!data.providerId) {
            throw new AppException("Provider ID is required for Apple registration");
        }

        const appleUser = await this.verifyAppleToken(data.providerId);

        if (!appleUser.email) {
            throw new AppException("Apple account does not have an email");
        }

        const createUserData: CreateUserData = UserMapper.loginDtoToCreateInput(data, {
            email: appleUser.email,
            providerId: appleUser.sub || undefined
        });

        return await this.createOrRetrieveUser(createUserData);
    }

    private async verifyAppleToken(token: string) {
        const decodedToken = jwt.decode(token, { complete: true });

        if (!decodedToken || typeof decodedToken === 'string' || !decodedToken.header.kid) {
            throw new AppException("Invalid Apple token");
        }

        const publicKey = await this.getAppleSigningKey(decodedToken.header.kid);

        try {
            const payload = jwt.verify(token, publicKey, {
                algorithms: ['RS256'],
                audience: env.APPLE_CLIENT_ID,
                issuer: this.ISSUER,
            }) as jwt.JwtPayload;

            return {
                email: payload.email,
                sub: payload.sub
            };
        } catch (error) {
            throw new AppException("Apple token verification failed");
        }
    }

    private async getAppleSigningKey(kid: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.appleJwksClient.getSigningKey(kid, (err, key) => {
                if (err || !key) {
                    return reject(err);
                }
                resolve(key.getPublicKey());
            });
        });
    }
}