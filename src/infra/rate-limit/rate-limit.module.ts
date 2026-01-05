import { ThrottlerStorageRedis, ThrottlerStorageRedisService } from "@nest-lab/throttler-storage-redis";
import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { env } from "src/config/env";

@Module({
    imports: [
        ThrottlerModule.forRootAsync({
            useFactory: () => ({
                throttlers: [
                    {
                        ttl: 60,
                        limit: 10
                    }
                ],
                storage: new ThrottlerStorageRedisService({
                    host: env.REDIS_HOST,
                    port: env.REDIS_PORT,
                    password: env.REDIS_PASSWORD
                })
            })
        })
    ],
    exports: [ThrottlerModule]
})

export class RateLimitModule { }