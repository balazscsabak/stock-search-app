'use server'

import { apiClient } from '@/lib/axios'
import {
  stockOverviewMockData,
  stockQuoteMockData,
  stockSearchMockData,
  stockTimeSeriesMockData,
} from '@/mock/data'

// Search stocks using SYMBOL_SEARCH
export const searchStocks = async (query: string, mock: boolean) => {
  if (mock) {
    return stockSearchMockData
  }

  const response = await apiClient.get(`/query`, {
    params: {
      function: 'SYMBOL_SEARCH',
      keywords: query,
      datatype: 'json',
      apikey: process.env.STOCK_API_KEY,
    },
  })

  return response.data
}

// Get stock overview (company information)
export const getStockOverview = async (symbol: string, mock: boolean) => {
  if (mock) {
    return stockOverviewMockData
  }

  const response = await apiClient.get(`/query`, {
    params: {
      function: 'OVERVIEW',
      symbol: symbol,
      datatype: 'json',
      apikey: process.env.STOCK_API_KEY,
    },
  })

  console.log({ response: response.data })

  return response.data
}

// Get stock quote
export const getStockQuote = async (symbol: string, mock: boolean) => {
  if (mock) {
    return stockQuoteMockData
  }

  const response = await apiClient.get(`/query`, {
    params: {
      function: 'GLOBAL_QUOTE',
      symbol: symbol,
      datatype: 'json',
      apikey: process.env.STOCK_API_KEY,
    },
  })

  return response.data
}

// Get daily time series data
export const getStockTimeSeries = async (symbol: string, mock: boolean) => {
  if (mock) {
    return stockTimeSeriesMockData
  }

  const response = await apiClient.get(`/query`, {
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol: symbol,
      datatype: 'json',
      apikey: process.env.STOCK_API_KEY,
    },
  })

  return response.data
}
