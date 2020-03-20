import * as lib from '@/lib/api-client'
export { isCancel } from '@/lib/api-client'
import axios from '@/plugins/axios'

export abstract class ApiClient<
  UriParams extends Record<string, any> = never,
  QueryParams extends Record<string, any> = never
> extends lib.ApiClient<UriParams, QueryParams> {
  constructor() {
    super(axios)
  }
}
