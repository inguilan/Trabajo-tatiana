"use client"

import type React from "react"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"

export function WishlistSheet({ children }: { children: React.ReactNode }) {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()

  const moveToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
    removeItem(item.id)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Lista de deseos
            {items.length > 0 && <Badge>{items.length}</Badge>}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Tu lista de deseos está vacía</p>
                <p className="text-sm text-gray-400">Guarda tus productos favoritos aquí</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                      <span className="text-lg font-bold text-rose-600">${item.price.toLocaleString()}</span>

                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => moveToCart(item)} className="bg-rose-600 hover:bg-rose-700">
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          Agregar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
