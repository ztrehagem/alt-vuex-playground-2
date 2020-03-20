import { ApiClient } from '../lib/api-client'
import axios from './axios'

export default abstract class<
  UriParams extends Record<string, any> = never,
  QueryParams extends Record<string, any> = never
> extends ApiClient<UriParams, QueryParams> {
  constructor() {
    super(axios)
  }
}
