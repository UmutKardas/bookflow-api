import { Injectable } from "@nestjs/common";
import { AuthLoginDto } from "../dto/auth.login.dto";
import { AuthRegisterDto } from "../dto/auth.register.dto";
import { BaseAuthProvider } from "./base.auth.provider";
import { AuthResponseDto } from "../dto/auth.response.dto";
import { OAuth2Client } from "google-auth-library";
import { env } from "src/config/env";
import { UserMapper } from "src/common/mappers/user.mapper";

@Injectable()
export class GoogleProvider extends BaseAuthProvider {
    private readonly client: OAuth2Client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

    async validateRegister(data: AuthRegisterDto): Promise<AuthResponseDto> {
        if (!data.providerId) {
            throw new Error("Provider ID is required for Google registration");
        }

        const googleUser = await this.verifyGoogleToken(data.providerId);

        if (!googleUser.email) {
            throw new Error("Google account does not have an email");
        }

        const createUserData = UserMapper.registerDtoToCreateInput(data, {
            email: googleUser.email || undefined,
            name: googleUser.name || undefined,
            providerId: googleUser.sub || undefined
        });

        return await this.createOrRetrieveUser(createUserData);
    }

    async validateLogin(data: AuthLoginDto): Promise<AuthResponseDto> {
        if (!data.providerId) {
            throw new Error("Provider ID is required for Google login");
        }

        const googleUser = await this.verifyGoogleToken(data.providerId);

        if (!googleUser.email) {
            throw new Error("Google account does not have an email");
        }

        const createUserData = UserMapper.loginDtoToCreateInput(data, {
            email: googleUser.email || undefined,
            name: googleUser.name || undefined,
            providerId: googleUser.sub || undefined,
        });

        return await this.createOrRetrieveUser(createUserData);
    }

    private verifyGoogleToken = async (token: string) => {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: token,
                audience: env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();

            return {
                email: payload?.email,
                name: payload?.name,
                picture: payload?.picture,
                sub: payload?.sub
            }
        } catch (error) {
            throw error;
        }
    }
}