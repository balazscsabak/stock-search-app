'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/(common)/components/ui/card'

interface FinancialHighlightsProps {
  revenueTTM?: string
  profitMargin?: string
  returnOnAssets?: string
  returnOnEquity?: string
}

export function FinancialHighlights({
  revenueTTM,
  profitMargin,
  returnOnAssets,
  returnOnEquity,
}: FinancialHighlightsProps) {
  const highlights = [
    { label: 'Revenue (TTM)', value: revenueTTM },
    { label: 'Profit Margin', value: profitMargin },
    { label: 'Return on Assets', value: returnOnAssets },
    { label: 'Return on Equity', value: returnOnEquity },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Highlights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {highlights.map((highlight) => (
          <div key={highlight.label} className="flex justify-between">
            <span className="text-muted-foreground text-sm">
              {highlight.label}
            </span>
            <span className="font-medium">{highlight.value || 'N/A'}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
