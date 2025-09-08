import { getStockQuote } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

interface UseStockQuoteProps {
  symbol: string
  mock: boolean
}

export const useStockQuote = ({ symbol, mock }: UseStockQuoteProps) => {
  return useQuery({
    queryKey: ['stock-quote', { symbol, mock }],
    queryFn: () => getStockQuote(symbol, mock),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000, // 5 minute
  })
}
