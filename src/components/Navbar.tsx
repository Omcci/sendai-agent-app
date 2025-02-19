"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"
import { ModeToggle } from "./ModeToggle"

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <h1 className="text-xl font-bold">Solana Agent</h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent hover:text-foreground md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" className="mr-2">Dashboard</Button>
          </div>
          <nav className="flex items-center space-x-2">
            <WalletMultiButton className="phantom-button" />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </nav>
  )
}

function MobileNav() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-xl font-bold">Solana Agent</h1>
      <Button variant="outline" className="w-full justify-start">Dashboard</Button>
    </div>
  )
}