import { ArgumentsHost, Catch } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core/exceptions'
import GenericException from '../infrastructure/exception/generic.exception'
import { getHttpData } from '../utils/exceptionHandler.util'
import { BadRequestException } from '../infrastructure/exception/badRequest.exception'
import { ErrorCodes } from '../infrastructure/exception/errorCode'
import { ForbiddenException } from '../infrastructure/exception/forbidden.exception'
import { IntegrationException } from '../infrastructure/exception/integration.exception'
import { UnauthorizedException } from '../infrastructure/exception/unauthorized.exception'
import { UnprocessableEntityException } from '../infrastructure/exception/unprocessableEntitiy.exception'
import { NotFoundException } from '../infrastructure/exception/notFound.exception'
import { ServiceException } from '../infrastructure/exception/service.exception'
import { AlreadyExistsException } from '../infrastructure/exception/alreadyExists.exception'

const buildMessage = (errorCode, params?) => {
  return {
    code: errorCode.code,
    message: errorCode.message,
    ...params
  }
}

@Catch(GenericException)
export class ExceptionHandler extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const { req, res, date } = getHttpData(host)
    console.warn('EXCEPTION: ', exception)
    switch (exception.constructor) {
      case GenericException: {
        res.status(exception.code.statusCode).json(
          buildMessage({
            code: exception.code,
            serviceName: exception.service,
            data: exception.data,
            param: exception.data
          })
        )
        return
      }
      case BadRequestException: {
        res.status(ErrorCodes.BAD_REQUEST.statusCode).json(
          buildMessage(ErrorCodes.BAD_REQUEST, {
            param: exception.param,
            data: exception.data
          })
        )
        return
      }
      case ForbiddenException: {
        res.status(ErrorCodes.FORBIDDEN_ERROR.statusCode).json(
          buildMessage(ErrorCodes.FORBIDDEN_ERROR, {
            param: exception.param
          })
        )
        return
      }
      case IntegrationException: {
        res.status(ErrorCodes.UNPROCESSABLE_ENTITY.statusCode).json(
          buildMessage(ErrorCodes.UNPROCESSABLE_ENTITY, {
            param: exception.param
          })
        )
        return
      }
      case UnauthorizedException: {
        res.status(ErrorCodes.UNAUTHORIZED_ERROR.statusCode).json(
          buildMessage(ErrorCodes.UNAUTHORIZED_ERROR, {
            param: exception.param
          })
        )
        return
      }
      case UnprocessableEntityException: {
        res.status(ErrorCodes.UNPROCESSABLE_ENTITY.statusCode).json(
          buildMessage(ErrorCodes.UNPROCESSABLE_ENTITY, {
            param: exception.param,
            data: exception.data
          })
        )
        return
      }
      case NotFoundException: {
        res.status(ErrorCodes.NOT_FOUND_ERROR.statusCode).json(
          buildMessage(ErrorCodes.NOT_FOUND_ERROR, {
            param: exception.param,
            data: exception.data
          })
        )
        return
      }
      case ServiceException: {
        res.status(ErrorCodes.SERVICE_ERROR.statusCode).json(
          buildMessage(ErrorCodes.SERVICE_ERROR, {
            serviceName: exception.service,
            data: exception.data
          })
        )
        return
      }
      case AlreadyExistsException: {
        res.status(exception.code.statusCode).json(
          buildMessage(exception.code, {
            data: exception.data
          })
        )
        return
      }
      default:
        res
          .status(ErrorCodes.INTERNAL_SERVER_ERROR.statusCode)
          .json(buildMessage(ErrorCodes.INTERNAL_SERVER_ERROR))
    }
    return
  }
}
