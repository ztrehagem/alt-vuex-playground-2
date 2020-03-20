import AxiosMock from 'axios-mock-adapter'
import axios from '../plugins/axios'

const mock = new AxiosMock(axios, { delayResponse: 700 })

mock.onPost('/session').reply(400, { email: ['hoge'] })
mock.onDelete('/session').reply(204)
