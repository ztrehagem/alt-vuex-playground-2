import ApiClient from '../plugins/api-client'
import ValidationError from '../app/errors/validation-error'
import UnexpectedError from '../app/errors/unexpected-error'

interface Payload {
  email: string
  password: string
}

export default class extends ApiClient {
  get uri() {
    return '/users'
  }

  get method() {
    return 'post' as const
  }

  execute(payload: Payload) {
    try {
      return this.$request({ data: payload })
    } catch (error) {
      switch (error?.response?.status) {
        case 400:
          throw new ValidationError(error)
        default:
          throw new UnexpectedError(error)
      }
    }
  }
}
