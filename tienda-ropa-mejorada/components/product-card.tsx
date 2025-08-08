"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingBag, Eye, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { ProductQuickView } from "@/components/product-quick-view"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  sizes?: string[]
  colors?: string[]
  inStock?: boolean
  isNew?: boolean
  discount?: number
}

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false)
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: discountedPrice,
      image: product.imageUrl,
      quantity: 1,
    })
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: discountedPrice,
        image: product.imageUrl,
      })
    }
  }

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="relative w-48 h-48">
            <Image src={product.imageUrl || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500">Nuevo</Badge>}
            {product.discount && <Badge className="absolute top-2 right-2 bg-red-500">-{product.discount}%</Badge>}
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{product.category}</Badge>
                  {!product.inStock && <Badge variant="destructive">Agotado</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-rose-600">${discountedPrice.toLocaleString()}</span>
                  {product.discount && (
                    <span className="text-lg text-gray-500 line-through">${product.price.toLocaleString()}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className={isInWishlist(product._id) ? "text-red-500" : ""}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product._id) ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setShowQuickView(true)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button onClick={handleAddToCart} disabled={!product.inStock} className="bg-rose-600 hover:bg-rose-700">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-green-500 hover:bg-green-600">Nuevo</Badge>}
            {product.discount && <Badge className="bg-red-500 hover:bg-red-600">-{product.discount}%</Badge>}
          </div>

          {/* Overlay con botones */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleWishlistToggle}
              className={`bg-white/90 hover:bg-white ${isInWishlist(product._id) ? "text-red-500" : ""}`}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(product._id) ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setShowQuickView(true)}
              className="bg-white/90 hover:bg-white"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Agotado
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">{product.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

            {/* Rating simulado */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
              ))}
              <span className="text-xs text-gray-500 ml-1">(4.0)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-rose-600">${discountedPrice.toLocaleString()}</span>
                {product.discount && (
                  <span className="text-sm text-gray-500 line-through">${product.price.toLocaleString()}</span>
                )}
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-rose-600 hover:bg-rose-700"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              {product.inStock ? "Agregar al carrito" : "Agotado"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <ProductQuickView product={product} open={showQuickView} onOpenChange={setShowQuickView} />
    </>
  )
}
