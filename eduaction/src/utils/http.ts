import axios from 'axios'
import qs from 'qs'

const Axios = axios.create({
})

// 超时时间
Axios.defaults.timeout = 5000

// 设置请求头
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加一个请求拦截器
Axios.interceptors.request.use(function (config) {
  // 在请求发出之前进行一些操作
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, function (err) {
  // Do something with request error
  return Promise.reject(err)
})
// 添加一个响应拦截器
Axios.interceptors.response.use(function (res) {
  // 在这里对返回的数据进行处理
  return res.data
}, function (err) {
  // Do something with response error
  return Promise.reject(err)
})

export const _post = (url: string, data: any, option: any) => Axios.post(url, data, option)
export const _get = (url: string, data: any) => Axios.get(url, data)

export default Axios
