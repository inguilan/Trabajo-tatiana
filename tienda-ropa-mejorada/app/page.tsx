"use client"

import { FilterSidebar } from "@/components/filter-sidebar"
import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { ProductGridSkeleton } from "@/components/product-grid-skeleton"
import { useEffect, useState } from "react"

interface RawProduct {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  categoria: string
  publicado: boolean
}

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    categories: [] as number[],
    sizes: [] as string[],
  })

  // Esta función recibe los filtros del sidebar
  const handleFiltersChange = (newFilters: {
    categories: number[]
    sizes: string[]
  }) => {
    setFilters(newFilters)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/productos/")
        console.log(res)
        if (!res.ok) throw new Error("Error fetching products")
        const data: RawProduct[] = await res.json()

        let formattedProducts = data.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion,
          precio: item.precio,
          imagen: item.imagen,
          categoria: item.categoria,
        }))

        // Filtrado en el frontend
        formattedProducts = formattedProducts.filter((p) => {
          const inCategory =
            filters.categories.length === 0 ||
            filters.categories.includes(Number(p.categoria))
          return inCategory
        })

        setProducts(formattedProducts)
      } catch (error) {
        console.error("Error loading productos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters]) // 🔹 Vuelve a cargar cuando cambian los filtros

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80">
            <FilterSidebar onFiltersChange={handleFiltersChange} />
          </aside>
          <div className="flex-1">
            {loading ? (
              <ProductGridSkeleton />
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Productos
                  </h2>
                  <p className="text-gray-600">
                    {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                  </p>
                </div>
                <ProductGrid products={products} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
