import axios from 'axios'

const instance = axios.create()

instance.interceptors.request.use((request) => {
  console.log('request interceptor', request)
  return request
})

instance.interceptors.response.use(
  (response) => {
    console.log('response interceptor', response)
    return response
  },
  (error) => {
    console.log('error response interceptor', error.response)
    return Promise.reject(error)
  },
)

export default instance
