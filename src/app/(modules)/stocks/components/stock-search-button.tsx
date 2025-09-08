'use client'

import { Alert, AlertTitle } from '@/app/(common)/components/ui/alert'
import { Label } from '@/app/(common)/components/ui/label'
import { Switch } from '@/app/(common)/components/ui/switch'
import { Stock } from '@/types/stock'
import { AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSearchStock } from '../hooks/use-search-stock'
import { StockResultsTable } from './stock-results-table'
import { StockSearchInput } from './stock-search-input'

export function StockSearchButton() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const [useMock, setUseMock] = useState(true)

  const { data, isLoading, error } = useSearchStock({
    query: searchQuery,
    mock: useMock,
  })

  // Transform the API response to our Stock interface
  const stocks: Stock[] =
    data?.bestMatches?.map(
      (match: {
        '1. symbol': string
        '2. name': string
        '3. type': string
        '4. region': string
        '5. marketOpen': string
        '6. marketClose': string
        '7. timezone': string
        '8. currency': string
        '9. matchScore': string
      }) => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        type: match['3. type'],
        region: match['4. region'],
        marketOpen: match['5. marketOpen'],
        marketClose: match['6. marketClose'],
        timezone: match['7. timezone'],
        currency: match['8. currency'],
        matchScore: match['9. matchScore'],
      }),
    ) || []

  const handleSelect = (stock: Stock) => {
    router.push(`/stocks/${stock.symbol}`)
  }

  // Check if API credit warning should be shown
  const showApiWarning = data?.Information && !data?.bestMatches

  return (
    <div className="space-y-6 py-8">
      <div className="flex items-center justify-center space-x-2">
        <Label htmlFor="mock-data-switch" className="text-sm font-medium">
          Use Mock Data
        </Label>
        <Switch
          id="mock-data-switch"
          checked={useMock}
          onCheckedChange={setUseMock}
        />
      </div>

      {showApiWarning && (
        <Alert variant="destructive" className="mx-auto max-w-lg">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            API Credit Limit Reached - Standard API rate limit is 25 requests
            per day
          </AlertTitle>
        </Alert>
      )}

      <StockSearchInput
        onSearchChange={setSearchQuery}
        placeholder="Search for stocks by symbol or company name..."
      />

      {searchQuery && (
        <StockResultsTable
          stocks={stocks}
          isLoading={isLoading}
          error={error}
          onStockSelect={handleSelect}
          searchQuery={searchQuery}
        />
      )}
    </div>
  )
}
