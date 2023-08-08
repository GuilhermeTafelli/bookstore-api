export interface ErrorCode {
  code: string
  message: string
}

export const ErrorCodes = {
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal Server Error',
    statusCode: 500
  },
  BAD_REQUEST: {
    code: 'BAD_REQUEST',
    message: 'Bad request',
    statusCode: 400
  },
  UNAUTHORIZED_ERROR: {
    code: 'UNAUTHORIZED_ERROR',
    message: 'Unauthorized',
    statusCode: 401
  },
  FORBIDDEN_ERROR: {
    code: 'FORBIDDEN_ERROR',
    message: 'Forbidden',
    statusCode: 403
  },
  SERVICE_ERROR: {
    code: 'SERVICE_ERROR',
    message: 'Some error ocurred on service',
    statusCode: 500
  },
  ALREADY_EXISTS: {
    code: 'SERVICE_ERROR',
    message: 'Already exists an entity with this param',
    statusCode: 422
  },
  BOOK_IS_RENTED: {
    code: 'BOOK_IS_RENTED',
    message: 'This book is already rented',
    statusCode: 422
  },
  EMAIL_ALREADY_EXISTS: {
    code: 'SERVICE_ERROR',
    message: 'There is already a entity registered with this email',
    statusCode: 422
  },
  NOT_FOUND_ERROR: {
    code: 'NOT_FOUND_ERROR',
    message: 'Entity not found for param offered',
    statusCode: 404
  },
  MAX_DAILY_RESET_PASSWORD_REQUESTS_EXCEDED: {
    code: 'MAX_DAILY_RESET_PASSWORD_REQUESTS_EXCEDED',
    message: 'Max daily reset password requests exceded',
    statusCode: 429
  },
  INVALID_TOKEN: {
    code: 'INVALID_OR_EXPIRED_TOKEN',
    message: 'Invalid or expired reset token',
    statusCode: 498
  },
  UNPROCESSABLE_ENTITY: {
    code: 'UNPROCESSABLE_ENTITY',
    message: 'Your entity must be modified to be',
    statusCode: 422
  },
  REQUEST_TIMEOUT: {
    code: 'REQUEST_TIMEOUT',
    message: 'The request took too long',
    statusCode: 408
  }
}
