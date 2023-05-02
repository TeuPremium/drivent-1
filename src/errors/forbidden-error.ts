import { ApplicationError } from '@/protocols';

export function forbiddenError(): ApplicationError {
  return {
    name: 'ForbiddenError',
    message: 'Payment required to continue',
  };
}
