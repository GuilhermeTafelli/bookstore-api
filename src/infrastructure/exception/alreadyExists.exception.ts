import { ErrorCodes } from '../../infrastructure/exception/errorCode'
import GenericException from '../../infrastructure/exception/generic.exception'

export class AlreadyExistsException extends GenericException {
  constructor(public params: string[] | string, service?: string, context?: {[key:string]: any}) {
    super(ErrorCodes.ALREADY_EXISTS, service, context)
  }
}
