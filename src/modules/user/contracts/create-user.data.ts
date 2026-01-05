import { ProviderType } from "src/generated/prisma/enums";

export interface CreateUserData {
    provider: ProviderType;
    email: string;
    password?: string;
    name: string;
    providerId?: string;
}