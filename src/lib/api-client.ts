import axiosStatic, {
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenSource,
} from 'axios'

type HttpMethod = 'get' | 'put' | 'post' | 'delete'

interface RequestConfig<UriParams, QueryParams> {
  params?: UriParams
  query?: QueryParams
  data?: any
  cancelPreviousCall?: boolean
}

export function buildUri(str: string, params: Record<string, any> = {}) {
  return str.replace(/\/\{([^/]+?)\}/g, (match: string, key: string) =>
    params[key] ? `/${params[key]}` : '',
  )
}

export abstract class ApiClient<
  UriParams extends Record<string, any> = never,
  QueryParams extends Record<string, any> = never
> {
  private localAxios?: AxiosInstance
  static staticAxios?: AxiosInstance
  protected cancelTokenSource: CancelTokenSource | null = null

  constructor(axios?: AxiosInstance) {
    this.localAxios = axios
  }

  protected abstract get uri(): string

  protected abstract get method(): AxiosRequestConfig['method']

  protected get axios() {
    return this.localAxios || ApiClient.staticAxios || axiosStatic
  }

  protected get localConfig() {
    return {}
  }

  protected request(
    config: RequestConfig<UriParams, QueryParams> = {},
    extraConfig: AxiosRequestConfig = {},
  ) {
    if (config.cancelPreviousCall && this.cancelTokenSource) {
      this.cancelTokenSource.cancel()
    }

    this.cancelTokenSource = axiosStatic.CancelToken.source()

    return this.axios.request({
      method: this.method,
      url: buildUri(this.uri, config.params),
      params: config.query,
      data: config.data,
      cancelToken: this.cancelTokenSource.token,
      ...this.localConfig,
      ...extraConfig,
    })
  }

  protected async $request(
    ...args: Parameters<ApiClient<UriParams, QueryParams>['request']>
  ) {
    const { data } = await this.request(...args)
    return data
  }
}
