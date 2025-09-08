'use client'

import { Badge } from '@/app/(common)/components/ui/badge'
import { Button } from '@/app/(common)/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/(common)/components/ui/table'
import { useFavoritesStore } from '@/lib/stores/favorites-store'
import { Heart, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function FavoritesList() {
  const { favorites, removeFavorite } = useFavoritesStore()
  const router = useRouter()

  if (favorites.length === 0) {
    return (
      <div className="mt-[40vh] flex flex-col items-center justify-center text-center">
        <Heart className="text-muted-foreground mb-4 h-12 w-12" />
        <h3 className="mb-2 text-xl font-semibold">No favorites yet</h3>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold md:text-4xl">
          Favorite Stocks ({favorites.length})
        </h1>
        <Heart className="text-muted-foreground mx-auto mt-4 mb-16 h-10 w-10" />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Added</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {favorites.map((stock) => (
              <TableRow
                key={stock.symbol}
                className="hover:bg-muted/50 cursor-pointer"
                onClick={() => router.push(`/stocks/${stock.symbol}`)}
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
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(stock.addedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFavorite(stock.symbol)
                    }}
                    className="text-muted-foreground h-8 w-8 hover:bg-red-50 hover:text-red-500"
                    title="Remove from favorites"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
