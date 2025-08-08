"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Package, TrendingUp, Users, DollarSign } from "lucide-react"

export function AdminPanel() {
  const [products, setProducts] = useState([])
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    sizes: [],
    colors: [],
    inStock: true,
    isNew: false,
    discount: 0,
  })

  const categories = ["Vestidos", "Blusas", "Pantalones", "Faldas", "Chaquetas", "Accesorios"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const colors = ["Negro", "Blanco", "Rosa", "Azul", "Verde", "Rojo", "Amarillo", "Morado"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el producto
    console.log("Producto guardado:", form)
    setShowAddProduct(false)
    setEditingProduct(null)
    resetForm()
  }

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      category: "",
      sizes: [],
      colors: [],
      inStock: true,
      isNew: false,
      discount: 0,
    })
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setForm(product)
    setShowAddProduct(true)
  }

  const handleDelete = (id: string) => {
    // Aquí iría la lógica para eliminar el producto
    console.log("Producto eliminado:", id)
  }

  return (
    <div className="border-t bg-gray-50 p-6">
      <div className="container mx-auto">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,450,000</div>
                  <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <p className="text-xs text-muted-foreground">+180.1% desde el mes pasado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Productos</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">+19% desde el mes pasado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">+201 desde el mes pasado</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Productos</h2>
              <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
                <DialogTrigger asChild>
                  <Button className="bg-rose-600 hover:bg-rose-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Producto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}</DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre del producto</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Categoría</Label>
                        <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Precio</Label>
                        <Input
                          id="price"
                          type="number"
                          value={form.price}
                          onChange={(e) => setForm({ ...form, price: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="discount">Descuento (%)</Label>
                        <Input
                          id="discount"
                          type="number"
                          min="0"
                          max="100"
                          value={form.discount}
                          onChange={(e) => setForm({ ...form, discount: Number.parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">URL de la imagen</Label>
                      <Input
                        id="imageUrl"
                        value={form.imageUrl}
                        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Tallas disponibles</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {sizes.map((size) => (
                            <Button
                              key={size}
                              type="button"
                              variant={form.sizes.includes(size) ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                const newSizes = form.sizes.includes(size)
                                  ? form.sizes.filter((s) => s !== size)
                                  : [...form.sizes, size]
                                setForm({ ...form, sizes: newSizes })
                              }}
                            >
                              {size}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label>Colores disponibles</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {colors.map((color) => (
                            <Button
                              key={color}
                              type="button"
                              variant={form.colors.includes(color) ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                const newColors = form.colors.includes(color)
                                  ? form.colors.filter((c) => c !== color)
                                  : [...form.colors, color]
                                setForm({ ...form, colors: newColors })
                              }}
                            >
                              {color}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
                        {editingProduct ? "Actualizar" : "Agregar"} Producto
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowAddProduct(false)
                          setEditingProduct(null)
                          resetForm()
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Productos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Aquí iría la lista de productos */}
                  <p className="text-gray-500">No hay productos para mostrar.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Funcionalidad de pedidos en desarrollo.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analíticas y Reportes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Funcionalidad de analíticas en desarrollo.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
