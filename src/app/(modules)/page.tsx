import { StockSearchButton } from '@/app/(modules)/stocks/components/stock-search-button'

export default function HomePage() {
  return (
    <div>
      <div className="mt-[40vh] flex items-center justify-center">
        <div className="space-y-6 text-center">
          <div className="text-4xl font-bold">
            Welcome to the Stock Search App
          </div>

          <div className="text-xl">Start searching for stocks</div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-2">
        <StockSearchButton />
      </div>
    </div>
  )
}
