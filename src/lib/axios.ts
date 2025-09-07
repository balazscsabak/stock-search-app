import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const baseConfig: AxiosRequestConfig = {
  timeout: 10000, // 10 seconds timeout
  baseURL: process.env.NEXT_PUBLIC_STOCK_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

// Base axios client
export const apiClient: AxiosInstance = axios.create(baseConfig)
