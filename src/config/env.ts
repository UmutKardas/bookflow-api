import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),

    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

    JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
    JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET is required'),

    REDIS_HOST: z.string().min(1, 'REDIS_HOST is required'),
    REDIS_PORT: z.coerce.number().default(6379),
    REDIS_PASSWORD: z.string().optional(),

    GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
    APPLE_CLIENT_ID: z.string().min(1, 'APPLE_CLIENT_ID is required'),

    ELASTICSEARCH_NODE: z.string().min(1, 'ELASTICSEARCH_NODE is required'),
    ELASTICSEARCH_USERNAME: z.string().optional(),
    ELASTICSEARCH_PASSWORD: z.string().optional(),

});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error(
        'Missing environment variables:',
        parsed.error.issues.map(i => i.path.join('.')),
    );
    process.exit(1);
}

export const env = parsed.data;
