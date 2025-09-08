import { getStockOverview } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

interface UseStockOverviewProps {
  symbol: string
  mock: boolean
}

export const useStockOverview = ({ symbol, mock }: UseStockOverviewProps) => {
  return useQuery({
    queryKey: ['stock-overview', { symbol, mock }],
    queryFn: () => getStockOverview(symbol, mock),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
