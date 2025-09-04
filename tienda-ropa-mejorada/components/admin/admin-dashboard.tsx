'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/context/AuthContext'
import {
    Eye,
    EyeOff,
    LogOut,
    Package,
    Plus,
    Trash2,
    Users
} from 'lucide-react'
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

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showEditProduct, setShowEditProduct] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    tallas_disponibles: '',
    publicado: true,
    imagen: null, // Campo para la imagen
  })
  const [newCategory, setNewCategory] = useState({
    nombre: '',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('http://localhost:8000/api/productos/'),
        fetch('http://localhost:8000/api/categorias/')
      ])

      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error('Error al cargar datos')
      }

      const [productsData, categoriesData] = await Promise.all([
        productsRes.json(),
        categoriesRes.json()
      ])

      setProducts(productsData)
      setCategories(categoriesData)
    } catch (err) {
      setError('Error al cargar los datos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('nombre', newProduct.nombre)
      formData.append('descripcion', newProduct.descripcion)
      formData.append('precio', newProduct.precio)
      formData.append('categoria', newProduct.categoria)
      formData.append('tallas_disponibles', newProduct.tallas_disponibles)
      formData.append('publicado', newProduct.publicado.toString())
      if (newProduct.imagen) {
        formData.append('imagen', newProduct.imagen) // Agregar la imagen al FormData
      }

      const response = await fetch('http://localhost:8000/api/productos/', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setShowAddProduct(false)
        setNewProduct({
          nombre: '',
          descripcion: '',
          precio: '',
          categoria: '',
          tallas_disponibles: '',
          publicado: true,
          imagen: null,
        })
        fetchData()
      } else {
        setError('Error al crear el producto')
      }
    } catch (err) {
      setError('Error al crear el producto')
      console.error(err)
    }
  }

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      try {
        const formData = new FormData()
        formData.append('nombre', newProduct.nombre)
        formData.append('descripcion', newProduct.descripcion)
        formData.append('precio', newProduct.precio)
        formData.append('categoria', newProduct.categoria)
        formData.append('tallas_disponibles', newProduct.tallas_disponibles)
        formData.append('publicado', newProduct.publicado.toString())
        if (newProduct.imagen) {
          formData.append('imagen', newProduct.imagen)
        }

        const response = await fetch(`http://localhost:8000/api/productos/${editingProduct.id}/`, {
          method: 'PUT',
          body: formData,
        })

        if (response.ok) {
          setShowEditProduct(false)
          setEditingProduct(null)
          setNewProduct({
            nombre: '',
            descripcion: '',
            precio: '',
            categoria: '',
            tallas_disponibles: '',
            publicado: true,
            imagen: null,
          })
          fetchData()
        } else {
          setError('Error al actualizar el producto')
        }
      } catch (err) {
        setError('Error al actualizar el producto')
        console.error(err)
      }
    }
  }

  const deleteProduct = async (productId: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return
    }

    try {
      const response = await fetch(`http://localhost:8000/api/productos/${productId}/`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchData()
      } else {
        setError('Error al eliminar el producto')
      }
    } catch (err) {
      setError('Error al eliminar el producto')
    }
  }

  const deleteCategory = async (categoryId: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      return
    }

    try {
      const response = await fetch(`http://localhost:8000/api/categorias/${categoryId}/`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchData()
      } else {
        setError('Error al eliminar la categoría')
      }
    } catch (err) {
      setError('Error al eliminar la categoría')
    }
  }

  const imageUrl = (src: string) => {
    return src?.startsWith("/") ? `http://localhost:8000${src}` : src || "/placeholder.svg"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando panel administrativo...</p>
        </div>
      </div>
    )
  }

  function handleAddCategory(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel Administrativo</h1>
              <p className="text-gray-600">Bienvenido, {user?.username}</p>
            </div>
            <Button onClick={logout} variant="outline" className="text-red-600 hover:text-red-700">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Gestión de Categorías */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Gestión de Categorías</CardTitle>
                <CardDescription>
                  Administra las categorías de tu tienda
                </CardDescription>
              </div>
              <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
                <DialogTrigger asChild>
                  <Button className="bg-rose-600 hover:bg-rose-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Categoría
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Agregar Nueva Categoría</DialogTitle>
                    <DialogDescription>
                      Completa la información de la nueva categoría
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddCategory} className="space-y-4">
                    <div>
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input
                        id="nombre"
                        value={newCategory.nombre}
                        onChange={(e) => setNewCategory({ nombre: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setShowAddCategory(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
                        Crear Categoría
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{category.nombre}</h3>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteCategory(category.id)}
                    className="text-red-600 hover:text-red-700"
                    title="Eliminar categoría"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {categories.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No hay categorías registradas
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Gestión de Productos */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Gestión de Productos</CardTitle>
                <CardDescription>
                  Administra todos los productos de tu tienda
                </CardDescription>
              </div>
              <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
                <DialogTrigger asChild>
                  <Button className="bg-rose-600 hover:bg-rose-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Producto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                    <DialogDescription>
                      Completa la información del nuevo producto
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input
                          id="nombre"
                          value={newProduct.nombre}
                          onChange={(e) => setNewProduct({...newProduct, nombre: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="precio">Precio</Label>
                        <Input
                          id="precio"
                          type="number"
                          step="0.01"
                          value={newProduct.precio}
                          onChange={(e) => setNewProduct({...newProduct, precio: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="descripcion">Descripción</Label>
                      <Textarea
                        id="descripcion"
                        value={newProduct.descripcion}
                        onChange={(e) => setNewProduct({...newProduct, descripcion: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="categoria">Categoría</Label>
                        <Select value={newProduct.categoria} onValueChange={(value) => setNewProduct({...newProduct, categoria: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="tallas">Tallas Disponibles</Label>
                        <Input
                          id="tallas"
                          placeholder="S,M,L,XL"
                          value={newProduct.tallas_disponibles}
                          onChange={(e) => setNewProduct({...newProduct, tallas_disponibles: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="imagen">Imagen</Label>
                      <Input
                        id="imagen"
                        type="file"
                        onChange={(e) => setNewProduct({...newProduct, imagen: e.target.files?.[0] || null})}
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setShowAddProduct(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
                        Crear Producto
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      {product.imagen ? (
                        <img 
                          src={imageUrl(product.imagen)} 
                          alt={product.nombre}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{product.nombre}</h3>
                      <p className="text-sm text-gray-600">${product.precio.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">
                        Categoría: {categories.find(c => c.id === product.categoria)?.nombre || 'Sin categoría'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={product.publicado ? "default" : "secondary"}>
                      {product.publicado ? "Publicado" : "Oculto"}
                    </Badge>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleProductStatus(product.id, product.publicado)}
                      title={product.publicado ? "Ocultar producto" : "Mostrar producto"}
                    >
                      {product.publicado ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Eliminar producto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No hay productos registrados
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
