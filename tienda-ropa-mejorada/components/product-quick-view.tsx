"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingBag, Star, Minus, Plus } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"

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

interface ProductQuickViewProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductQuickView({ product, open, onOpenChange }: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist } = useWishlist()

  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: discountedPrice,
      image: product.imageUrl,
      quantity,
      size: selectedSize,
      color: selectedColor,
    })
    onOpenChange(false)
  }

  const handleAddToWishlist = () => {
    addToWishlist({
      id: product._id,
      name: product.name,
      price: discountedPrice,
      image: product.imageUrl,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vista rápida del producto</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Imagen */}
          <div className="relative aspect-square">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
            {product.isNew && <Badge className="absolute top-4 left-4 bg-green-500">Nuevo</Badge>}
            {product.discount && <Badge className="absolute top-4 right-4 bg-red-500">-{product.discount}%</Badge>}
          </div>

          {/* Detalles */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(4.0) • 24 reseñas</span>
              </div>

              {/* Precio */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-rose-600">${discountedPrice.toLocaleString()}</span>
                {product.discount && (
                  <span className="text-xl text-gray-500 line-through">${product.price.toLocaleString()}</span>
                )}
              </div>
            </div>

            <Separator />

            {/* Tallas */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Talla</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="w-12 h-10"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Colores */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Color</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Cantidad */}
            <div>
              <h3 className="font-medium mb-3">Cantidad</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Botones de acción */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-rose-600 hover:bg-rose-700 h-12"
                size="lg"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {product.inStock ? "Agregar al carrito" : "Agotado"}
              </Button>

              <Button variant="outline" onClick={handleAddToWishlist} className="w-full h-12" size="lg">
                <Heart className={`h-5 w-5 mr-2 ${isInWishlist(product._id) ? "fill-current text-red-500" : ""}`} />
                {isInWishlist(product._id) ? "En favoritos" : "Agregar a favoritos"}
              </Button>
            </div>

            {/* Información adicional */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>✓ Envío gratis en compras superiores a $100.000</p>
              <p>✓ Devoluciones gratuitas hasta 30 días</p>
              <p>✓ Garantía de calidad</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
