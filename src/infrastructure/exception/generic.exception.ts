import { ErrorCode } from '../../infrastructure/exception/errorCode'

export default class GenericException extends Error {
  constructor(
    public code: ErrorCode,
    public service?: string,
    public context?: {[key: string]: any}
  ) {
    super()
  }
}
