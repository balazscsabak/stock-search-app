import { getStockTimeSeries } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

interface UseStockTimeSeriesProps {
  symbol: string
  mock: boolean
}

export const useStockTimeSeries = ({
  symbol,
  mock,
}: UseStockTimeSeriesProps) => {
  return useQuery({
    queryKey: ['stock-time-series', { symbol, mock }],
    queryFn: () => getStockTimeSeries(symbol, mock),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
