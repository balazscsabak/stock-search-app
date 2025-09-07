'use client'

import { Stock } from '@/types/stock'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSearchStock } from '../hooks/use-search-stock'
import { StockSearchCombobox } from './stock-search-combobox'

export function StockSearchButton() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const router = useRouter()

  const { data, isLoading, error } = useSearchStock({
    query: value,
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
    setOpen(false)
    router.push(`/stocks/${stock.symbol}`)
  }

  return (
    <StockSearchCombobox
      open={open}
      onOpenChange={setOpen}
      value={value}
      setValue={setValue}
      stocks={stocks}
      isLoading={isLoading}
      error={error}
      onStockSelect={handleSelect}
    />
  )
}
