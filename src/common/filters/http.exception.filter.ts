import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal Server Error';
        let description = '';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse()

            if (typeof res === "string") {
                message = res
            }
            else {
                message = (res as any).message || message
                description = (res as any).description || '';
            }
        }

        response.status(status).json({
            code: status,
            error: {
                message: message,
                description: description
            }
        });
    }
}