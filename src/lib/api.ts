'use server'

import { apiClient } from '@/lib/axios'

// Search stocks using SYMBOL_SEARCH
export const searchStocks = async (query: string) => {
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
