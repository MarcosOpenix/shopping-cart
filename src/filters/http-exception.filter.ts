import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

const getFormatedError = (exception: any, status: HttpStatus, url: string) => {
  const exceptionResponse = exception.getResponse();
  let errorResponse = {
    statusCode: status,
    timestamp: new Date().toISOString(),
    path: url,
    message: exceptionResponse,
  };

  switch (true) {
    case exception instanceof QueryFailedError:
      errorResponse.message = 'Hubo un error durante el proceso.';
      errorResponse.statusCode = HttpStatus.CONFLICT;
      return errorResponse;
    default:
      if (exceptionResponse instanceof Object) {
        errorResponse.message = exceptionResponse.message;
        return errorResponse;
      }
      return errorResponse;
  }
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const formatedError = getFormatedError(exception, status, request.url);
    response.status(status).json(formatedError);
  }
}
