'use client'

import { useDebounce } from '@uidotdev/usehooks'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'

import Spinner from '@/app/(common)/components/spinner'
import { Button } from '@/app/(common)/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/app/(common)/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/(common)/components/ui/popover'
import { ScrollArea } from '@/app/(common)/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Stock } from '@/types/stock'

interface StockSearchComboboxProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: string
  setValue: (value: string) => void
  stocks: Stock[]
  isLoading: boolean
  error: Error | null
  onStockSelect: (stock: Stock) => void
}

export function StockSearchCombobox({
  open,
  onOpenChange,
  value,
  setValue,
  stocks,
  isLoading,
  error,
  onStockSelect,
}: StockSearchComboboxProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchTerm = useDebounce(searchQuery, 300)

  useEffect(() => {
    setValue(debouncedSearchTerm)
  }, [debouncedSearchTerm, setValue])

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          Stock Search
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput
            placeholder="Search stocks..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <ScrollArea>
            <div className="max-h-[200px]">
              <CommandList>
                {isLoading && (
                  <div className="text-muted-foreground py-6 text-center text-sm">
                    <Spinner />
                  </div>
                )}
                {error && (
                  <div className="text-destructive py-6 text-center text-sm">
                    Error searching stocks. Please try again.
                  </div>
                )}
                {!isLoading &&
                  !error &&
                  stocks.length === 0 &&
                  searchQuery.length >= 2 && (
                    <CommandEmpty>No stocks found.</CommandEmpty>
                  )}
                {!isLoading && !error && searchQuery.length < 2 && (
                  <div className="text-muted-foreground py-6 text-center text-sm">
                    Type at least 2 characters to search...
                  </div>
                )}
                {stocks.length > 0 && (
                  <CommandGroup>
                    {stocks.map((stock) => (
                      <CommandItem
                        key={stock.symbol}
                        value={`${stock.symbol} ${stock.name}`}
                        onSelect={() => onStockSelect(stock)}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === `${stock.symbol} - ${stock.name}`
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">{stock.symbol}</span>
                          <span className="text-muted-foreground text-sm">
                            {stock.name}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {stock.type} • {stock.region}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </div>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
