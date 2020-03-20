import { AppError } from './app-error'

export class CancelError extends AppError {
  get isExpected() {
    return true
  }
}
