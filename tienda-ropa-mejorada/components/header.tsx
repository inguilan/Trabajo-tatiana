"use client"

import { CartSheet } from "@/components/cart-sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { WishlistSheet } from "@/components/wishlist-sheet"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { Heart, Menu, Search, Settings, ShoppingBag, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const { items: cartItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-4">Menú</h2>
                  <nav className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      Inicio
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Categorías
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Ofertas
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      Contacto
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Tienda Tatiana 👗
            </h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-0 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <WishlistSheet>
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-pink-500">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </WishlistSheet>

            <CartSheet>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-rose-500">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </CartSheet>

            <Link href="/admin">
              <Button variant="ghost" size="icon" title="Panel Administrativo">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-0"
            />
          </div>
        </div>
      </div>

    </header>
  )
}
