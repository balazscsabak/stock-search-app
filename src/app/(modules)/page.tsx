import { StockSearchButton } from '@/app/(modules)/stocks/components/stock-search-button'

export default function HomePage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="space-y-6 text-center">
        <div className="text-4xl font-bold">
          Welcome to the Stock Search App
        </div>

        <div className="text-xl">Start searching for stocks</div>

        <div className="flex justify-center">
          <StockSearchButton />
        </div>
      </div>
    </div>
  )
}
