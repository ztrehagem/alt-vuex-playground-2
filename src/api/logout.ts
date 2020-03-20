import { ApiClient } from '@/plugins/api-client'
import { AppError } from '@/app/errors/app-error'

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
      throw new AppError(error)
    }
  }
}
