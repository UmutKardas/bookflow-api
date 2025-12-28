import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(3000),
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
    JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
    REDIS_HOST: z.string().min(1, "REDIS_HOST is required"),
    REDIS_PORT: z.coerce.number().default(6379),
    REDIS_PASSWORD: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
    APPLE_CLIENT_ID: z.string().min(1, "APPLE_CLIENT_ID is required"),
});

let env;

try {
    env = envSchema.parse(process.env);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.error("Missing environment variables:", error.issues.flatMap(issue => issue.path));
    } else {
        console.error(error);
    }
    process.exit(1);
}

export { env };