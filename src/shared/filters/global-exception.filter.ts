import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { 
  DomainException, 
  DomainNotFoundException, 
  InvalidStateTransitionException, 
  DomainValidationException,
  DomainDuplicateException 
} from '../exceptions/domain-exceptions';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorType = 'InternalServerError';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse() as any;
      message = typeof responseBody === 'object' ? responseBody.message || responseBody.error : responseBody;
      errorType = exception.constructor.name;
    } else if (exception instanceof DomainException) {
      errorType = exception.constructor.name;
      if (exception instanceof DomainNotFoundException) {
        status = HttpStatus.NOT_FOUND;
        message = exception.message;
      } else if (exception instanceof InvalidStateTransitionException) {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
      } else if (exception instanceof DomainValidationException) {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
      } else if (exception instanceof DomainDuplicateException) {
        status = HttpStatus.CONFLICT;
        message = exception.message;
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      errorType = exception.constructor.name;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: errorType,
      message: message,
    });
  }
}
