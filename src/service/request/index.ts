import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { RequestConfig, RequestInterceptors } from './type'
// import { ElLoading } from 'element-plus'

class Request {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  // showLoading?:

  constructor(config: RequestConfig) {
    // 创建实例
    this.instance = axios.create(config)

    // 设置基本信息
    this.interceptors = config.interceptors

    // 添加单个实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data

        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (error) => {
        return error
      }
    )
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对单个请求的config进行处理
      if (config.interceptors?.requestInterceptor) {
        // config.interceptors.requestInterceptor(config) 返回值为config
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          resolve(res)
        })
        .catch((err) => {
          // this.showLoading
          reject(err)
        })
    })
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default Request
