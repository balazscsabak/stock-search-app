'use server'

import { unstable_cache } from 'next/cache'

interface TrendingStocksData {
  top_gainers: Array<{
    ticker: string
    price: string
    change_amount: string
    change_percentage: string
    volume: string
  }>
  top_losers: Array<{
    ticker: string
    price: string
    change_amount: string
    change_percentage: string
    volume: string
  }>
  most_actively_traded: Array<{
    ticker: string
    price: string
    change_amount: string
    change_percentage: string
    volume: string
  }>
}

async function fetchTrendingStocksFromAPI(): Promise<TrendingStocksData> {
  const apiKey = process.env.STOCK_API_KEY

  if (!apiKey) {
    throw new Error('API key not configured')
  }

  const response = await fetch(
    `${process.env.ALPHA_VANTAGE_BASE_URL || 'https://www.alphavantage.co'}/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`,
  )

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  const data = await response.json()

  if (data.Information && !data.top_gainers) {
    throw new Error('API rate limit reached')
  }

  return data
}

export const getTrendingStocks = unstable_cache(
  async (): Promise<TrendingStocksData> => {
    return await fetchTrendingStocksFromAPI()
  },
  ['trending-stocks'],
  {
    revalidate: 24 * 60 * 60, // 1 day
    tags: ['trending-stocks'],
  },
)
