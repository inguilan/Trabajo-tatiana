"use client"

import { useState } from "react"
import { Product } from "@/types"
  import { ProductCard } from "./product-card"


export interface Product {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
}

export function ProductGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("default")
  const [view, setView] = useState<"grid" | "list">("grid")

  const sortedProducts = [...products].sort((a, b) => {
    // puedes ordenar si deseas
    return 0
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {sortedProducts.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded shadow">
          <img src={product.imagen} alt={product.nombre} className="w-full h-48 object-cover mb-4" />
          <h2 className="text-lg font-bold">{product.nombre}</h2>
          <p className="text-sm text-gray-500">{product.descripcion}</p>
          <p className="text-pink-600 font-semibold mt-2">${product.precio}</p>
        </div>
      ))}
    </div>
  )
}
