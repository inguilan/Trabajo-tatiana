"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ProductGridSkeleton } from "@/components/product-grid-skeleton"

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
    colors: [] as string[],
    priceRange: [0, 500000],
  })

  // Esta función recibe los filtros del sidebar
  const handleFiltersChange = (newFilters: {
    categories: number[]
    sizes: string[]
    colors: string[]
    priceRange: number[]
  }) => {
    setFilters(newFilters)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/productos/")
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

        // Filtrado básico en el frontend (opcional, hasta que el backend lo maneje)
        formattedProducts = formattedProducts.filter((p) => {
          const inCategory =
            filters.categories.length === 0 ||
            filters.categories.includes(Number(p.categoria))
          const inPrice =
            p.precio >= filters.priceRange[0] &&
            p.precio <= filters.priceRange[1]
          return inCategory && inPrice
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
            <FilterSidebar onFiltersChange={handleFiltersChange} /> {/* ✅ Aquí pasamos la función */}
          </aside>
          <div className="flex-1">
            {loading ? (
              <ProductGridSkeleton />
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
