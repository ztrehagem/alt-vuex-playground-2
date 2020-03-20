import { AxiosError } from 'axios'
import AppError from './app-error'

type StringKeyof<T> = { [K in keyof T]: K }[keyof T] & string

export type ValidationErrorMessages<Prop extends string> = Partial<
  Record<Prop, string[]>
>

export interface Validation<Context> {
  prop: StringKeyof<Context>
  validate: (ctx: Context) => boolean
  message: string
}

export default class ValidationError<Prop extends string> extends AppError {
  errors?: ValidationErrorMessages<Prop>

  static fromApiResponse(error: AxiosError) {
    const ve = new ValidationError(error)
    ve.errors = error.response?.data
    return ve
  }
}

export class ValidationErrorBuilder<Prop extends string> {
  errors: ValidationErrorMessages<Prop> = {}

  add(prop: Prop, message: string) {
    this.errors[prop] = this.errors[prop]?.concat([message]) || [message]
  }

  get hasErrors() {
    return Object.keys(this.errors).length > 0
  }

  toError() {
    if (!this.hasErrors) return null

    const error = new ValidationError<Prop>()
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
    this.collection
      .filter(({ validate }) => !validate(context))
      .forEach(({ prop, message }) => builder.add(prop, message))
    return builder.toError()
  }
}
