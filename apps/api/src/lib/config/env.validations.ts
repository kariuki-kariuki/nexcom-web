import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  console.log('config', config);
  const validateConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validateConfig, {
    skipMissingProperties: true,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validateConfig;
}
