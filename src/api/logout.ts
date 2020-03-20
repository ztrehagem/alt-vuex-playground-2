import ApiClient from '../plugins/api-client'
import UnexpectedError from '../app/errors/unexpected-error'

export default class extends ApiClient {
  get uri() {
    return '/session'
  }

  get method() {
    return 'delete' as const
  }

  async execute() {
    try {
      return await this.$request()
    } catch (error) {
      throw new UnexpectedError(error)
    }
  }
}
