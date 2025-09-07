import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/app/(common)/components/ui/navigation-menu'
import Link from 'next/link'

const MainNavBar = () => {
  return (
    <NavigationMenu
      viewport={false}
      className="fixed top-2 right-0 left-0 z-50 mx-auto rounded-2xl bg-indigo-700 px-8 py-4"
    >
      <NavigationMenuList className="gap-8">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/stocks">Stocks</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/stocks/favorites">Favorites</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MainNavBar
