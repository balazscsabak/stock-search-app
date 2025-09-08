'use client'

import { Badge } from '@/app/(common)/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/(common)/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Stock {
  ticker: string
  price: string
  change_amount: string
  change_percentage: string
  volume: string
}

interface TrendingStocksListProps {
  title: string
  stocks: Stock[]
  type: 'gainers' | 'losers' | 'active'
}

export function TrendingStocksList({
  title,
  stocks,
  type,
}: TrendingStocksListProps) {
  const router = useRouter()

  const handleStockClick = (ticker: string) => {
    router.push(`/stocks/${ticker}`)
  }

  const getChangeColor = (changeAmount: string, type: string) => {
    const change = parseFloat(changeAmount)

    if (type === 'gainers') return 'text-green-600'

    if (type === 'losers') return 'text-red-600'

    return change >= 0 ? 'text-green-600' : 'text-red-600'
  }

  const getChangeIcon = (changeAmount: string, type: string) => {
    const change = parseFloat(changeAmount)

    if (type === 'gainers') return <TrendingUp className="h-3 w-3" />

    if (type === 'losers') return <TrendingDown className="h-3 w-3" />

    return change >= 0 ? (
      <TrendingUp className="h-3 w-3" />
    ) : (
      <TrendingDown className="h-3 w-3" />
    )
  }

  const formatVolume = (volume: string) => {
    const num = parseInt(volume)

    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`

    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`

    return num.toLocaleString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {type === 'gainers' && (
            <TrendingUp className="h-5 w-5 text-green-600" />
          )}
          {type === 'losers' && (
            <TrendingDown className="h-5 w-5 text-red-600" />
          )}
          {type === 'active' && (
            <div className="h-5 w-5 rounded-full bg-blue-600" />
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stocks.slice(0, 10).map((stock, index) => (
            <div
              key={stock.ticker}
              className="hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors"
              onClick={() => handleStockClick(stock.ticker)}
            >
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs">
                  #{index + 1}
                </Badge>
                <div>
                  <div className="font-semibold">{stock.ticker}</div>
                  <div className="text-muted-foreground text-sm">
                    Vol: {formatVolume(stock.volume)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  ${parseFloat(stock.price).toFixed(2)}
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm',
                    getChangeColor(stock.change_amount, type),
                  )}
                >
                  {getChangeIcon(stock.change_amount, type)}
                  <span>
                    {stock.change_amount} ({stock.change_percentage})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
