import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DEFAULT_RESPONSE } from 'constants/response';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Default response structure
    const defaultResponse = {
      ...DEFAULT_RESPONSE,
      message: 'Internal server error',
    };

    // Determine status code and message based on exception type
    if (exception instanceof HttpException) {
      const statusCode =
        exception?.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;

      // Customize the default response
      defaultResponse.statusCode = statusCode;
      if (exception?.message) {
        defaultResponse.message = exception?.message;
      }
      if (exception.getResponse()?.['message']) {
        defaultResponse.message = exception.getResponse()?.['message'];
      }
    }

    // Send the response with custom structure
    response.status(defaultResponse.statusCode).json(defaultResponse);
  }
}
