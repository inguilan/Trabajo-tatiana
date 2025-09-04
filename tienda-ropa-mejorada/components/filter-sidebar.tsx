"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Filter, X } from "lucide-react"
import { useEffect, useState } from "react"

interface Categoria {
  id: number
  nombre: string
}

interface FilterSidebarProps {
  onFiltersChange: (filters: {
    categories: number[]
    sizes: string[]
  }) => void
}

export function FilterSidebar({ onFiltersChange }: FilterSidebarProps) {
  const [categories, setCategories] = useState<Categoria[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  // Cargar categorías desde el backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/categorias/")
        if (!res.ok) throw new Error("Error al obtener categorías")
        const data = await res.json()
        setCategories(data)
      } catch (error) {
        console.error("Error cargando categorías:", error)
      }
    }
    fetchCategorias()
  }, [])

  // Notificar cambios al padre
  useEffect(() => {
    onFiltersChange({
      categories: selectedCategories,
      sizes: selectedSizes
    })
  }, [selectedCategories, selectedSizes])

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(c => c !== categoryId) : [...prev, categoryId]
    )
  }

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSizes([])
  }

  const activeFiltersCount =
    selectedCategories.length + selectedSizes.length

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount}</Badge>
            )}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categorías */}
        <div>
          <h3 className="font-medium mb-3">Categorías</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <label
                  htmlFor={`cat-${category.id}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  {category.nombre}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Tallas */}
        <div>
          <h3 className="font-medium mb-3">Tallas</h3>
          <div className="flex flex-wrap gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
              <Button
                key={size}
                variant={selectedSizes.includes(size) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSize(size)}
                className="h-8 w-12"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
