import * as bcrypt from "bcrypt"

const SALT_COUNT = 10;

export async function hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, SALT_COUNT);
}

export async function compare(plainText: string, hashedString: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedString);
}