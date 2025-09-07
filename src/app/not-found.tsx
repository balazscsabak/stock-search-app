import { Button } from '@/app/(common)/components/ui/button'
import { Card, CardContent } from '@/app/(common)/components/ui/card'
import Link from 'next/link'

const GlobalNotFoundPage = () => {
  return (
    <div className="flex min-h-[90vh] items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardContent className="space-y-6 p-8 text-center">
          <div className="text-6xl font-bold text-zinc-400">404</div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Page Not Found</h1>
            <p>The page you&apos;re looking for doesn&apos;t exist.</p>
          </div>

          <Button asChild className="w-full">
            <Link href="/">Go Back Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default GlobalNotFoundPage
