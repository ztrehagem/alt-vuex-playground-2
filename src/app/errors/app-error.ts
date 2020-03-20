export default class AppError extends Error {
  error: any // may be <Error>

  constructor(error?: any, message = 'APP_ERROR') {
    super(message)
    this.error = error
  }
}
