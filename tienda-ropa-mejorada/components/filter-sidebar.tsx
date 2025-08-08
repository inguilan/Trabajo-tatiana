"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Filter } from "lucide-react"

const categories = ["Vestidos", "Blusas", "Pantalones", "Faldas", "Chaquetas", "Accesorios"]

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

const colors = [
  { name: "Negro", value: "#000000" },
  { name: "Blanco", value: "#FFFFFF" },
  { name: "Rosa", value: "#EC4899" },
  { name: "Azul", value: "#3B82F6" },
  { name: "Verde", value: "#10B981" },
  { name: "Rojo", value: "#EF4444" },
  { name: "Amarillo", value: "#F59E0B" },
  { name: "Morado", value: "#8B5CF6" },
]

export function FilterSidebar() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500000])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedColors([])
    setPriceRange([0, 500000])
  }

  const activeFiltersCount = selectedCategories.length + selectedSizes.length + selectedColors.length

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
            {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
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
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <label
                  htmlFor={category}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Precio */}
        <div>
          <h3 className="font-medium mb-3">Precio</h3>
          <div className="px-2">
            <Slider value={priceRange} onValueChange={setPriceRange} max={500000} step={10000} className="w-full" />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Tallas */}
        <div>
          <h3 className="font-medium mb-3">Tallas</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
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

        <Separator />

        {/* Colores */}
        <div>
          <h3 className="font-medium mb-3">Colores</h3>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColors.includes(color.name) ? "border-gray-800 scale-110" : "border-gray-300"
                } transition-all duration-200`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
