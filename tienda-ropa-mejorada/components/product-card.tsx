"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { Eye, Heart, ShoppingBag, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  categoria: number
  publicado: boolean
  tallas_disponibles?: string
}

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = () => {
    addItem({
      id: product.id.toString(),
      name: product.nombre,
      price: product.precio,
      image: product.imagen,
      quantity: 1,
    })
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString())
    } else {
      addToWishlist({
        id: product.id.toString(),
        name: product.nombre,
        price: product.precio,
        image: product.imagen,
      })
    }
  }

  if (viewMode === "list") {
    return (
      <div className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="relative w-48 h-48">
            <Image 
              src={product.imagen ? `http://localhost:8000${product.imagen}` : "/placeholder.svg"} 
              alt={product.nombre} 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link href={`/productos/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 hover:text-rose-600 cursor-pointer">{product.nombre}</h3>
                </Link>
                <p className="text-gray-600 mb-3 line-clamp-2">{product.descripcion}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span>Categoría: {product.categoria}</span>
                  {!product.publicado && <span className="text-red-500">No disponible</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-rose-600">${product.precio.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className={isInWishlist(product.id.toString()) ? "text-red-500" : ""}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product.id.toString()) ? "fill-current" : ""}`} />
                </Button>
                <Link href={`/productos/${product.id}`}>
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Button onClick={handleAddToCart} disabled={!product.publicado} className="bg-rose-600 hover:bg-rose-700">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/productos/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden cursor-pointer">
          <Image
            src={product.imagen ? `http://localhost:8000${product.imagen}` : "/placeholder.svg"}
            alt={product.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.publicado && (
            <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs">
              No disponible
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="space-y-2">
          <span className="text-sm text-gray-500">Categoría: {product.categoria}</span>
          <Link href={`/productos/${product.id}`}>
            <h3 className="font-semibold text-lg leading-tight hover:text-rose-600 cursor-pointer">
              {product.nombre}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 line-clamp-2">{product.descripcion}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            ))}
            <span className="text-xs text-gray-500 ml-1">(4.0)</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-rose-600">${product.precio.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleAddToCart}
              disabled={!product.publicado}
              className="flex-1 bg-rose-600 hover:bg-rose-700"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              {product.publicado ? "Agregar al carrito" : "No disponible"}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleWishlistToggle}
              className={isInWishlist(product.id.toString()) ? "text-red-500 border-red-500" : ""}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(product.id.toString()) ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}