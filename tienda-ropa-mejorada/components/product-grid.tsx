"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export interface Product {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
}

export function ProductGrid({ products }: { products: Product[] }) {
  const [sort] = useState("default")
  const { addItem } = useCart()
  const { toast } = useToast()

  const sortedProducts = [...products].sort(() => 0)

  const imageUrl = (src: string) => (src?.startsWith("/") ? `http://localhost:8000${src}` : src || "/placeholder.svg")

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {sortedProducts.map((product) => (
        <div key={product.id} className="bg-white rounded shadow overflow-hidden group">
          <Link href={`/productos/${product.id}`}>
            <div className="relative w-full aspect-[3/4] bg-gray-100">
              <Image
                src={imageUrl(product.imagen)}
                alt={product.nombre}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          </Link>
          <div className="p-4 space-y-2">
            <Link href={`/productos/${product.id}`}>
              <h2 className="text-lg font-bold hover:text-rose-600 cursor-pointer">{product.nombre}</h2>
            </Link>
            <p className="text-sm text-gray-500 line-clamp-2">{product.descripcion}</p>
            <div className="flex items-center justify-between pt-2">
              <p className="text-rose-600 font-semibold text-lg">${product.precio.toLocaleString()}</p>
              <Button
                className="bg-rose-600 hover:bg-rose-700"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  addItem({
                    id: product.id.toString(),
                    name: product.nombre,
                    price: product.precio,
                    image: product.imagen,
                    quantity: 1,
                  })
                  toast({
                    title: "Producto agregado",
                    description: `${product.nombre} se agregó al carrito`,
                    variant: "success",
                  })
                }}
              >
                Agregar
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
