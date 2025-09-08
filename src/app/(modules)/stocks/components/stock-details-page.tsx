'use client'

import { Alert, AlertTitle } from '@/app/(common)/components/ui/alert'
import { Button } from '@/app/(common)/components/ui/button'
import { Card, CardContent } from '@/app/(common)/components/ui/card'
import { MockToggle } from '@/app/(common)/components/ui/mock-toggle'
import { Skeleton } from '@/app/(common)/components/ui/skeleton'
import { useStockOverview } from '@/app/(modules)/stocks/hooks/use-stock-overview'
import { useStockQuote } from '@/app/(modules)/stocks/hooks/use-stock-quote'
import { useStockTimeSeries } from '@/app/(modules)/stocks/hooks/use-stock-time-series'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CompanyOverview } from './company-overview'
import { FinancialHighlights } from './financial-highlights'
import { KeyMetrics } from './key-metrics'
import { PriceOverview } from './price-overview'
import { StockCharts } from './stock-charts'
import { StockHeader } from './stock-header'
import { TradingInformation } from './trading-information'

interface StockDetailsPageProps {
  symbol: string
}

export function StockDetailsPage({ symbol }: StockDetailsPageProps) {
  const router = useRouter()
  const [isMock, setIsMock] = useState(true)

  const {
    data: overview,
    isLoading: overviewLoading,
    error: overviewError,
  } = useStockOverview({ symbol, mock: isMock })
  const {
    data: quote,
    isLoading: quoteLoading,
    error: quoteError,
  } = useStockQuote({ symbol, mock: isMock })
  const {
    data: timeSeries,
    isLoading: timeSeriesLoading,
    error: timeSeriesError,
  } = useStockTimeSeries({ symbol, mock: isMock })

  const isLoading = overviewLoading || quoteLoading || timeSeriesLoading
  const error = overviewError || quoteError || timeSeriesError

  // Check for rate limit in any of the responses
  const showApiWarning =
    (overview?.Information && !overview?.Symbol) ||
    (quote?.Information && !quote?.['Global Quote']) ||
    (timeSeries?.Information && !timeSeries?.['Time Series (Daily)'])

  if (isLoading) {
    return <StockDetailsSkeleton />
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Error Loading Stock</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">
              Failed to load stock details for {symbol}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const quoteData = quote?.['Global Quote']

  if (!overview) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Stock Not Found</h1>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p>No data available for {symbol}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentPrice = quoteData?.['05. price']
  const change = quoteData?.['09. change']
  const changePercent = quoteData?.['10. change percent']

  return (
    <div className="container mx-auto space-y-4 px-4 py-4 sm:space-y-6 sm:px-6 sm:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="order-2 sm:order-1">
          <MockToggle isMock={isMock} onToggle={setIsMock} />
        </div>
      </div>

      <StockHeader
        name={overview.Name}
        symbol={overview.Symbol}
        assetType={overview.AssetType}
        country={overview.Country}
        currency={overview.Currency}
      />

      {showApiWarning && (
        <Alert variant="destructive" className="mx-auto max-w-full sm:max-w-lg">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">
            API Credit Limit Reached - Standard API rate limit is 25 requests
            per day
          </AlertTitle>
        </Alert>
      )}

      <PriceOverview
        currentPrice={currentPrice}
        change={change}
        changePercent={changePercent}
        latestTradingDay={quoteData?.['07. latest trading day']}
        marketCap={overview.MarketCapitalization}
      />

      <div className="w-full">
        <StockCharts timeSeriesData={timeSeries?.['Time Series (Daily)']} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CompanyOverview
            description={overview.Description}
            sector={overview.Sector}
            industry={overview.Industry}
            country={overview.Country}
            currency={overview.Currency}
          />
        </div>

        <div className="lg:col-span-1">
          <KeyMetrics
            peRatio={overview.PERatio}
            eps={overview.EPS}
            dividendYield={overview.DividendYield}
            week52High={overview['52WeekHigh']}
            week52Low={overview['52WeekLow']}
            beta={overview.Beta}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <FinancialHighlights
          revenueTTM={overview.RevenueTTM}
          profitMargin={overview.ProfitMargin}
          returnOnAssets={overview.ReturnOnAssetsTTM}
          returnOnEquity={overview.ReturnOnEquityTTM}
        />

        <TradingInformation
          volume={quoteData?.['06. volume']}
          previousClose={quoteData?.['08. previous close']}
          open={quoteData?.['02. open']}
          high={quoteData?.['03. high']}
          low={quoteData?.['04. low']}
        />
      </div>
    </div>
  )
}

function StockDetailsSkeleton() {
  return (
    <div className="container mx-auto space-y-4 px-4 py-4 sm:space-y-6 sm:px-6 sm:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="order-2 sm:order-1">
          <Skeleton className="h-16 w-32" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10" />
        <div className="flex-1">
          <Skeleton className="mb-2 h-8 w-full max-w-64" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <Skeleton className="h-32 w-full" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  )
}
