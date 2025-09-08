'use client'

import { Button } from '@/app/(common)/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/app/(common)/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/(common)/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const MainNavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/stocks/trending', label: 'Trending Stocks' },
    { href: '/favorites', label: 'Favorites' },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationMenu
        viewport={false}
        className="z-50 mx-auto mt-4 hidden rounded-2xl border border-indigo-800 bg-gray-50 px-12 py-2 md:flex"
      >
        <NavigationMenuList className="gap-8">
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()} bg-gray-50 text-black !ring-0 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:ring-0 focus:outline-0 active:bg-gray-100`}
              >
                <Link href={item.href}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Navigation */}
      <div className="z-50 mx-2 mt-2 flex items-center justify-between md:hidden">
        <div className="text-lg font-extrabold">CSB</div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-2xl border-2 bg-white shadow-lg hover:border-indigo-900 hover:bg-indigo-50"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full gap-0 bg-zinc-900">
            <SheetHeader className="p-2">
              <SheetTitle className="text-center text-2xl font-bold text-gray-900">
                Navigation
              </SheetTitle>
            </SheetHeader>
            <div className="mx-auto max-w-md px-6 py-4">
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl border-2 border-none px-6 py-4 text-center text-lg font-semibold transition-all hover:border-indigo-200 hover:bg-indigo-100 hover:text-indigo-900"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export default MainNavBar
