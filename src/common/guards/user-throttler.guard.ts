import { Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
    protected getTracker(req: Record<string, any>): Promise<string> {
        const userId = req.user?.id;
        if (userId) {
            return Promise.resolve(`user-${userId}`);
        }
        return super.getTracker(req);
    }
}