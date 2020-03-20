import { ApiClient, isCancel } from '@/plugins/api-client'
import { AppError } from '@/app/errors/app-error'
import { CancelError } from '@/app/errors/cancel-error'

export interface Payload {
  q: string
}

export default class extends ApiClient {
  get uri() {
    return '/search'
  }

  get method() {
    return 'get' as const
  }

  async execute(payload: Payload) {
    try {
      return await this.$request({ data: payload })
    } catch (error) {
      throw isCancel(error) ? new CancelError(error) : new AppError(error)
    }
  }
}
