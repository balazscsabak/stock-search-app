'use client'

import { Alert, AlertTitle } from '@/app/(common)/components/ui/alert'
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
  let stocks: Stock[] =
    data?.bestMatches?.map((match: any) => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
      marketOpen: match['5. marketOpen'],
      marketClose: match['6. marketClose'],
      timezone: match['7. timezone'],
      currency: match['8. currency'],
      matchScore: match['9. matchScore'],
    })) || []

  const handleSelect = (stock: Stock) => {
    router.push(`/stocks/${stock.symbol}`)
  }

  // Check if API credit warning should be shown
  const showApiWarning = data?.Information && !data?.bestMatches

  return (
    <div className="space-y-6 py-8">
      {showApiWarning && (
        <Alert variant="destructive" className="max-w-lg">
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
        label="Stock Search"
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
