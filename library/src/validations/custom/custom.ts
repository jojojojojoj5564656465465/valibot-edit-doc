import type { BaseValidation, ErrorMessage } from '../../types/index.ts';
import { actionIssue, actionOutput } from '../../utils/index.ts';

/**
 * Custom validation type.
 */
export interface CustomValidation<TInput> extends BaseValidation<TInput> {
  /**
   * The validation type.
   */
  type: 'custom';
  /**
   * The validation function.
   */
  requirement: (input: TInput) => boolean;
}

/**
 * Creates a custom validation function.
 *
 * @param requirement The validation function.
 * @param message The error message.
 *
 * @returns A validation function.
 */
export function custom<TInput>(
  requirement: (input: TInput) => boolean,
  message: ErrorMessage = 'Invalid input'
): CustomValidation<TInput> {
  return {
    type: 'custom',
    async: false,
    message,
    requirement,
    _parse(input) {
      return !this.requirement(input)
        ? actionIssue(this.type, this.message, input, this.requirement)
        : actionOutput(input);
    },
  };
}
