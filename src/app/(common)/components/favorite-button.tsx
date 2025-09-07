'use client'

import { Button } from '@/app/(common)/components/ui/button'
import { useFavoritesStore } from '@/lib/stores/favorites-store'
import { cn } from '@/lib/utils'
import { Stock } from '@/types/stock'
import { Heart } from 'lucide-react'

interface FavoriteButtonProps {
  stock: Stock
  size?: 'sm' | 'md' | 'lg'
  variant?: 'ghost' | 'outline'
  className?: string
}

export function FavoriteButton({
  stock,
  size = 'sm',
  variant = 'ghost',
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore()

  const isFavorited = isFavorite(stock.symbol)

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()

    toggleFavorite({
      symbol: stock.symbol,
      name: stock.name,
      type: stock.type,
      region: stock.region,
      currency: stock.currency,
    })
  }

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-10 w-10',
  }

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={handleToggle}
      className={cn(
        sizeClasses[size],
        'transition-colors',
        isFavorited
          ? 'text-red-500 hover:bg-red-50 hover:text-red-600'
          : 'text-muted-foreground hover:bg-red-50 hover:text-red-500',
        className,
      )}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={cn('h-4 w-4 transition-all', isFavorited && 'fill-current')}
      />
    </Button>
  )
}
