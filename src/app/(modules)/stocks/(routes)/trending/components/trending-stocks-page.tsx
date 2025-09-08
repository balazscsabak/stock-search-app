import { TrendingStocksList } from '@/app/(modules)/stocks/(routes)/trending/components/trending-stocks-list'

interface TrendingStocksPageProps {
  data?: {
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
  error?: string
}

export function TrendingStocksPage({ data, error }: TrendingStocksPageProps) {
  if (error) {
    return (
      <div className="">
        <div className="text-center">
          <h1 className="text-destructive mt-18 mb-4 text-2xl font-bold">
            Error Loading Trending Stocks
          </h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-8 px-2 py-8">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold md:text-4xl">Trending Stocks</h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          Top gainers, losers, and most actively traded stocks
        </p>
      </div>

      {data && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <TrendingStocksList
            title="Top Gainers"
            stocks={data.top_gainers}
            type="gainers"
          />
          <TrendingStocksList
            title="Top Losers"
            stocks={data.top_losers}
            type="losers"
          />
          <TrendingStocksList
            title="Most Active"
            stocks={data.most_actively_traded}
            type="active"
          />
        </div>
      )}
    </div>
  )
}
