"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  categoria: string
  publicado: boolean
}

export default function ProductoDetalle() {
  const { id } = useParams()
  const [producto, setProducto] = useState<Producto | null>(null)

  useEffect(() => {
    const fetchProducto = async () => {
      const res = await fetch(`http://localhost:8000/api/productos/${id}/`)
      const data = await res.json()
      setProducto(data)
    }
    if (id) fetchProducto()
  }, [id])

  if (!producto) return <p>Cargando...</p>

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={producto.imagen} alt={producto.nombre} className="w-full h-auto" />
        <div>
          <h1 className="text-2xl font-bold">{producto.nombre}</h1>
          <p className="text-gray-700 mt-2">{producto.descripcion}</p>
          <p className="text-pink-600 text-xl mt-4 font-semibold">${producto.precio}</p>
          {/* Aquí podrías agregar botón de "Agregar al carrito" */}
        </div>
      </div>
    </div>
  )
}
