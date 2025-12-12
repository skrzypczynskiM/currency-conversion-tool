import axios, { type AxiosInstance, type AxiosError } from 'axios'
import type { ApiError } from '../../types/common'

export const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.currencybeacon.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.message || 'An error occurred',
      status: error.response?.status,
      code: (error.response?.data as { code?: number })?.code,
    }
    return Promise.reject(apiError)
  }
)
