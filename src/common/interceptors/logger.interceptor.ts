import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const { method, url } = request
        const startDate = Date.now();


        return next.handle().pipe(
            tap(() => {
                const duration = Date.now() - startDate
                console.log(`[${method}] ${url} - ${duration}ms`);
            })
        );
    }

}