import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsJsonObject(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isJsonObject',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          try {
            const parsedvalue = JSON.parse(value);
            return (
              typeof parsedvalue === 'object' &&
              parsedvalue !== null &&
              !Array.isArray(parsedvalue)
            );
          } catch (e) {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid JSON object string`;
        },
      },
    });
  };
}
