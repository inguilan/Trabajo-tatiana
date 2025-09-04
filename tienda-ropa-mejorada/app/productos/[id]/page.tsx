'use client'  // Directiva para indicar que el archivo debe ser tratado como un componente de cliente

import { Header } from '@/components/header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/use-cart'
import { useWishlist } from '@/hooks/use-wishlist'
import { ArrowLeft, Heart, RotateCcw, Shield, ShoppingBag, Star, Truck } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Product {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  categoria: number
  publicado: boolean
  tallas_disponibles: string
}

interface Category {
  id: number
  nombre: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:8000/api/productos/${params.id}/`)
      
      if (!response.ok) {
        throw new Error('Producto no encontrado')
      }
      
      const productData: Product = await response.json()
      setProduct(productData)
      
      // Obtener información de la categoría
      if (productData.categoria) {
        const categoryResponse = await fetch(`http://localhost:8000/api/categorias/${productData.categoria}/`)
        if (categoryResponse.ok) {
          const categoryData: Category = await categoryResponse.json()
          setCategory(categoryData)
        }
      }
    } catch (err) {
      setError('Error al cargar el producto')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    
    addItem({
      id: product.id.toString(),
      name: product.nombre,
      price: product.precio,
      image: product.imagen,
      quantity: quantity,
    })
  }

  const handleWishlistToggle = () => {
    if (!product) return
    
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

  const sizes = product?.tallas_disponibles ? product.tallas_disponibles.split(',') : []
  
  // Colores disponibles para ropa
  const availableColors = [
    { name: "Negro", value: "#000000" },
    { name: "Blanco", value: "#FFFFFF" },
    { name: "Rosa", value: "#EC4899" },
    { name: "Azul", value: "#3B82F6" },
    { name: "Verde", value: "#10B981" },
    { name: "Rojo", value: "#EF4444" },
    { name: "Amarillo", value: "#F59E0B" },
    { name: "Morado", value: "#8B5CF6" },
    { name: "Gris", value: "#6B7280" },
    { name: "Beige", value: "#D2B48C" }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
            <p className="text-gray-600 mb-6">El producto que buscas no existe o ha sido eliminado.</p>
            <Button onClick={() => router.push('/')} className="bg-rose-600 hover:bg-rose-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-6 text-rose-600 hover:text-rose-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagen del producto */}
          <div className="space-y-4">
            
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {category && (
                  <Badge variant="secondary">{category.nombre}</Badge>
                )}
                {!product.publicado && (
                  <Badge variant="destructive">No disponible</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.nombre}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.8) • 124 reseñas</span>
              </div>
              
              <div className="text-3xl font-bold text-rose-600 mb-4">
                ${product.precio.toLocaleString()}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">{product.descripcion}</p>
            </div>

            {sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Tallas disponibles</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={selectedSize === size ? "bg-rose-600 hover:bg-rose-700" : ""}
                    >
                      {size.trim()}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Colores disponibles */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Colores disponibles</h3>
              <div className="grid grid-cols-5 gap-3">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor === color.name
                        ? "border-gray-800 scale-110"
                        : "border-gray-300"
                    } transition-all duration-200 flex items-center justify-center`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
              {selectedColor && (
                <p className="text-sm text-gray-600 mt-2">
                  Color seleccionado: <span className="font-medium">{selectedColor}</span>
                </p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Cantidad</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.publicado}
                className="flex-1 bg-rose-600 hover:bg-rose-700"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                {product.publicado ? 'Agregar al carrito' : 'No disponible'}
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

            <Separator />

            {/* Información del producto */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Información del producto</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Material:</span>
                    <span>100% Algodón</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cuidado:</span>
                    <span>Lavable en máquina</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Origen:</span>
                    <span>Colombia</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marca:</span>
                    <span>Tienda Tatiana</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Información adicional */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Beneficios de compra</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Envío gratis en compras superiores a $50.000</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Garantía de 30 días</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <RotateCcw className="h-4 w-4 text-purple-600" />
                  <span>Devoluciones gratuitas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
