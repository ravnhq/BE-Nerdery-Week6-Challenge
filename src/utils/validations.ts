import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export async function validateDto<T>(cls: new () => T, plain: any) {
  const instance = plainToInstance(cls, plain);
  const errors = await validate(instance as any);

  if (errors.length > 0) {
    const first = errors[0];
    const constraints = first.constraints ? Object.values(first.constraints).join(', ') : 'Validation error';
    throw new Error(constraints);
  }
  
  return instance as T;
}
