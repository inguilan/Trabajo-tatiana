'use client'  // Asegúrate de que este archivo se trate como un componente de cliente

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartSheet({ children }: { children: React.ReactNode }) {
  const { items, removeItem, updateQuantity, total } = useCart()

  // Función para obtener la URL de la imagen correctamente
  const getImageUrl = (image: string | null) => {
    if (!image || image.trim() === '') {
      return '/placeholder.svg' // Imagen de reserva si la URL de la imagen es inválida o vacía
    }
    return `http://localhost:8000${image}` // URL completa con el prefijo si la imagen es válida
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Carrito de compras
            {items.length > 0 && <Badge>{items.length}</Badge>}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
                <p className="text-sm text-gray-400">Agrega algunos productos para comenzar</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      

                      <div className="flex-1 space-y-2">
                        <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                        <div className="text-xs text-gray-500">
                          <span>Precio unitario: ${item.price.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          <span>Subtotal: ${(item.price * item.quantity).toLocaleString()}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-red-500 hover:text-red-700"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total:</span>
                  <span className="text-xl font-bold text-rose-600">${total.toLocaleString()}</span>
                </div>

                <SheetFooter>
                  <Link href="/carrito" className="w-full">
                    <Button className="w-full bg-rose-600 hover:bg-rose-700" size="lg">
                      Ver carrito completo
                    </Button>
                  </Link>
                </SheetFooter>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
