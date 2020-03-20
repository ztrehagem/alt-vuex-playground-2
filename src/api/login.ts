import ApiClient from '../plugins/api-client'
import ValidationError, {
  Validator,
  Validation,
} from '../app/errors/validation-error'
import UnexpectedError from '../app/errors/unexpected-error'

interface Payload {
  email: string
  password: string
}

const validations: Validation<Payload>[] = [
  {
    prop: 'email',
    validate: ({ email }) => !email,
    message: 'REQUIRED',
  },
  {
    prop: 'email',
    validate: ({ email }) => !email.match(/^[^@]+@[^@]+$/),
    message: 'INVALID_FORMAT',
  },
  {
    prop: 'password',
    validate: ({ password }) => !password,
    message: 'REQUIRED',
  },
]

export default class extends ApiClient {
  protected validator = new Validator<Payload>(validations)

  get uri() {
    return '/session'
  }

  get method() {
    return 'post' as const
  }

  validate(payload: Payload) {
    return this.validator.validate(payload)
  }

  async execute(payload: Payload) {
    const error = this.validate(payload)
    if (error) throw error

    try {
      return await this.$request({ data: payload })
    } catch (error) {
      switch (error?.response?.status) {
        case 400:
          throw ValidationError.fromApiResponse(error)
        default:
          throw new UnexpectedError(error)
      }
    }
  }
}
