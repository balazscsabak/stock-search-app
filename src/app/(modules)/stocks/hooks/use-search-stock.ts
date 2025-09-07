import { searchStocks } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

interface UseSearchStockProps {
  query: string
  mock: boolean
}

export const useSearchStock = ({ query, mock }: UseSearchStockProps) => {
  return useQuery({
    queryKey: ['stock', { query }],
    queryFn: () => searchStocks(query, mock),
    enabled: query.length >= 3, // Only run query if query has at least 2 characters
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
