import AxiosMock from 'axios-mock-adapter'
import axios from '../plugins/axios'

const mock = new AxiosMock(axios, { delayResponse: 700 })

mock.onPost('/session').reply((request) => {
  const statuses = [204, 400]
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  return [status, { email: ['NOT_EXIST'] }]
})
mock.onDelete('/session').reply(204)
mock.onGet('/search').reply(200)
