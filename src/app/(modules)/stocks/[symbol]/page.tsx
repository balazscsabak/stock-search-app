import { StockDetailsPage } from '../components/stock-details-page'

interface StockPageProps {
  params: {
    symbol: string
  }
}

export default async function StockPage({ params }: StockPageProps) {
  return <StockDetailsPage symbol={params.symbol} />
}
