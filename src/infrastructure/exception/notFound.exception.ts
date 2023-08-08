import { ErrorCodes } from '../../infrastructure/exception/errorCode'
import GenericException from '../../infrastructure/exception/generic.exception'

export class NotFoundException extends GenericException {
  constructor(public params: string[] | string, service?: string, context?: {[key:string]: any}) {
    super(ErrorCodes.NOT_FOUND_ERROR, service, context)
  }
}
