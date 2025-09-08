import { getTrendingStocks } from '@/lib/actions/trending-stocks'
import { TrendingStocksPage } from './components/trending-stocks-page'

export const metadata = {
  title: 'Trending Stocks | Stock Search App',
  description: 'View the top gaining, losing, and most actively traded stocks',
}

export const revalidate = 86400 // Revalidate every 1 day

export default async function TrendingPage() {
  try {
    const data = await getTrendingStocks()

    return <TrendingStocksPage data={data} />
  } catch (error) {
    return (
      <TrendingStocksPage
        error={
          error instanceof Error
            ? error.message
            : 'Failed to load trending stocks'
        }
      />
    )
  }
}
