'use client'

import Spinner from '@/app/(common)/components/spinner'
import { Badge } from '@/app/(common)/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/(common)/components/ui/table'
import { Stock } from '@/types/stock'
import { FavoriteButton } from '../../../(common)/components/favorite-button'

interface StockResultsTableProps {
  stocks: Stock[]
  isLoading: boolean
  error: Error | null
  onStockSelect: (stock: Stock) => void
  searchQuery: string
}

export function StockResultsTable({
  stocks,
  isLoading,
  error,
  onStockSelect,
  searchQuery,
}: StockResultsTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-destructive text-sm">
          Error searching stocks. Please try again.
        </div>
      </div>
    )
  }

  if (searchQuery.length < 3) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground text-sm">
          Type at least 3 characters to search...
        </div>
      </div>
    )
  }

  if (stocks.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground text-sm">No stocks found.</div>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow
              key={stock.symbol}
              className="hover:bg-muted/50 cursor-pointer"
              onClick={() => onStockSelect(stock)}
            >
              <TableCell className="font-medium">{stock.symbol}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {stock.name}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{stock.type}</Badge>
              </TableCell>
              <TableCell>{stock.region}</TableCell>
              <TableCell>{stock.currency}</TableCell>
              <TableCell>
                <FavoriteButton stock={stock} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
