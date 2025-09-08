'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/(common)/components/ui/card'

interface KeyMetricsProps {
  peRatio?: string
  eps?: string
  dividendYield?: string
  week52High?: string
  week52Low?: string
  beta?: string
}

export function KeyMetrics({
  peRatio,
  eps,
  dividendYield,
  week52High,
  week52Low,
  beta,
}: KeyMetricsProps) {
  const metrics = [
    { label: 'P/E Ratio', value: peRatio },
    { label: 'EPS', value: eps },
    { label: 'Dividend Yield', value: dividendYield },
    { label: '52W High', value: week52High },
    { label: '52W Low', value: week52Low },
    { label: 'Beta', value: beta },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex justify-between">
              <span className="text-muted-foreground text-sm">
                {metric.label}
              </span>
              <span className="font-medium">{metric.value || 'N/A'}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
