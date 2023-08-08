import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint
} from 'class-validator'

@ValidatorConstraint({ async: false })
export class IsObjectIdConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments
  ): boolean | Promise<boolean> {
    return /^[0-9a-fA-F]{24}$/.test(value)
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be an objectId`
  }
}

export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsObjectIdConstraint
    })
  }
}
