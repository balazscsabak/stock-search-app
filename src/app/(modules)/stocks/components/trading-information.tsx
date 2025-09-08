'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/(common)/components/ui/card'

interface TradingInformationProps {
  volume?: string
  previousClose?: string
  open?: string
  high?: string
  low?: string
}

export function TradingInformation({
  volume,
  previousClose,
  open,
  high,
  low,
}: TradingInformationProps) {
  const tradingData = [
    { label: 'Volume', value: volume },
    { label: 'Previous Close', value: previousClose },
    { label: 'Open', value: open },
    { label: 'High', value: high },
    { label: 'Low', value: low },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tradingData.map((item) => (
          <div key={item.label} className="flex justify-between">
            <span className="text-muted-foreground text-sm">{item.label}</span>
            <span className="font-medium">{item.value || 'N/A'}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
