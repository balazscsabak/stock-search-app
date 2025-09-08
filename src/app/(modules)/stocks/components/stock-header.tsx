'use client'

import { Button } from '@/app/(common)/components/ui/button'
import { FavoriteButton } from '@/app/(modules)/favorites/components/favorite-button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface StockHeaderProps {
  name: string
  symbol: string
  assetType?: string
  country?: string
  currency?: string
}

export function StockHeader({
  name,
  symbol,
  assetType,
  country,
  currency,
}: StockHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold sm:text-3xl">{name}</h1>
          <p className="text-muted-foreground text-base sm:text-lg">{symbol}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        {(assetType || country || currency) && (
          <FavoriteButton
            stock={{
              symbol,
              name,
              type: assetType || '',
              region: country || '',
              currency: currency || '',
              marketOpen: '09:30',
              marketClose: '16:00',
              timezone: 'UTC-5',
              matchScore: '1.0000',
            }}
            size="lg"
            className="mx-auto"
          />
        )}
      </div>
    </div>
  )
}
