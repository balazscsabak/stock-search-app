'use client'

import { useDebounce } from '@uidotdev/usehooks'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Input } from '@/app/(common)/components/ui/input'

interface StockSearchInputProps {
  onSearchChange: (query: string) => void
  placeholder?: string
}

export function StockSearchInput({
  onSearchChange,
  placeholder = 'Search for stocks...',
}: StockSearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchTerm = useDebounce(searchQuery, 300)

  useEffect(() => {
    onSearchChange(debouncedSearchTerm)
  }, [debouncedSearchTerm, onSearchChange])

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          id="stock-search"
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  )
}
