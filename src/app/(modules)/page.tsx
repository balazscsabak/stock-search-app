import { StockSearchButton } from '@/app/(modules)/stocks/components/stock-search-button'

export default function HomePage() {
  return (
    <div>
      <div className="mt-8 flex items-center justify-center px-2 md:mt-[25vh]">
        <div className="space-y-6 text-center">
          <div className="text-2xl font-bold md:text-4xl">
            Welcome to the Stock Search App
          </div>

          <div className="text-lg md:text-xl">Start searching for stocks</div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-2">
        <StockSearchButton />
      </div>
    </div>
  )
}
