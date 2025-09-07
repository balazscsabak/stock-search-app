import { Providers } from '@/lib/providers'
import type { Metadata } from 'next'
import MainNavBar from './(common)/components/navigation/main-nav-bar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stock Search App',
  description: 'Search for stocks and get information about them',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="dark">
        <Providers>
          <MainNavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
