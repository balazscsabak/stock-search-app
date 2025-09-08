'use client'

import { Card, CardContent } from '@/app/(common)/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'

interface PriceOverviewProps {
  currentPrice?: string
  change?: string
  changePercent?: string
  latestTradingDay?: string
  marketCap?: string
}

export function PriceOverview({
  currentPrice,
  change,
  changePercent,
  latestTradingDay,
  marketCap,
}: PriceOverviewProps) {
  if (!currentPrice) return null

  const isPositive = change && parseFloat(change) >= 0

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
              <span className="text-2xl font-bold sm:text-3xl">
                ${parseFloat(currentPrice).toFixed(2)}
              </span>
              <div
                className={cn(
                  'flex items-center gap-1',
                  isPositive ? 'text-green-600' : 'text-red-600',
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="text-sm font-medium sm:text-base">
                  {change} ({changePercent})
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
              {latestTradingDay}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-muted-foreground text-xs sm:text-sm">
              Market Cap
            </p>
            <p className="text-base font-semibold sm:text-lg">
              {marketCap || 'N/A'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
