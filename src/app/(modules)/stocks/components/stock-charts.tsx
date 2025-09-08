'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/(common)/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/(common)/components/ui/chart'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'

interface StockChartsProps {
  timeSeriesData?: Record<string, any>
}

export function StockCharts({ timeSeriesData }: StockChartsProps) {
  if (!timeSeriesData) return null

  // Transform the time series data for the charts
  const chartData = Object.entries(timeSeriesData)
    .map(([date, data]) => ({
      date: new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      price: parseFloat(data['4. close']),
      volume: parseInt(data['5. volume']),
      high: parseFloat(data['2. high']),
      low: parseFloat(data['3. low']),
      open: parseFloat(data['1. open']),
    }))
    .reverse()

  const chartConfig = {
    price: {
      label: 'Price',
      color: '#3b82f6',
    },
    volume: {
      label: 'Volume',
      color: '#10b981',
    },
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto h-[300px] w-full"
          >
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => `Date: ${value}`}
                    formatter={(value, name) => [
                      `$${Number(value).toFixed(2)}`,
                    ]}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#3b82f6' }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto h-[300px] w-full"
          >
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => `Date: ${value}`}
                    formatter={(value, name) => [
                      `${Number(value).toLocaleString()}`,
                    ]}
                  />
                }
              />
              <Bar dataKey="volume" fill="#10b981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
