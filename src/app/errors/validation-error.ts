import { AxiosError } from 'axios'
import AppError from './app-error'

type StringKeyof<T> = { [K in keyof T]: K }[keyof T] & string

export type ValidationErrorMessages<Keys extends string> = Partial<
  Record<Keys, string[]>
> //{ [Key in Keys]: string[] }  //Record<Keys, string[]>

export interface Validation<Context> {
  prop: StringKeyof<Context>
  validate: (ctx: Context) => boolean
  message: string
}

export default class ValidationError<Keys extends string> extends AppError {
  errors?: ValidationErrorMessages<Keys>

  static fromApiResponse(error: AxiosError) {
    const ve = new ValidationError(error)
    ve.errors = error.response?.data
    return ve
  }
}

export class ValidationErrorBuilder<Keys extends string> {
  errors: ValidationErrorMessages<Keys> = {}

  try(prop: Keys, validate: () => boolean, message: string) {
    const result = validate()
    if (!result) return

    this.errors[prop] = this.errors[prop]?.concat([message]) || [message]
  }

  get hasErrors() {
    return Object.keys(this.errors).length > 0
  }

  toError() {
    if (!this.hasErrors) return

    const error = new ValidationError<Keys>()
    error.errors = this.errors
    return error
  }
}

export class Validator<Context extends Record<string, any>> {
  protected collection: Validation<Context>[]

  constructor(collection: Validation<Context>[] = []) {
    this.collection = collection
  }

  add(validation: Validation<Context>) {
    this.collection.push(validation)
  }

  validate(context: Context) {
    const builder = new ValidationErrorBuilder<StringKeyof<Context>>()
    this.collection.forEach(({ prop, validate, message }) => {
      builder.try(prop, () => validate(context), message)
    })
    return builder.toError()
  }
}
