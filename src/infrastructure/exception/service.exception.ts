import { ErrorCodes } from '../../infrastructure/exception/errorCode'
import GenericException from '../../infrastructure/exception/generic.exception'

export class ServiceException extends GenericException {
  constructor(public params: string[] | string, service?: string, context?: {[key:string]: any}) {
    super(ErrorCodes.SERVICE_ERROR, service, context)
  }
}
