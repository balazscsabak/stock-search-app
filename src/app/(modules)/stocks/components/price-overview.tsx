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
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">
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
                <span className="font-medium">
                  {change} ({changePercent})
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              {latestTradingDay}
            </p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-sm">Market Cap</p>
            <p className="text-lg font-semibold">{marketCap || 'N/A'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
