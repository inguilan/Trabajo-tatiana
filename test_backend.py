#!/usr/bin/env python
"""
Script para probar el backend de Django
"""
import os
import sys
import django
from django.conf import settings

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tienda_backend.settings')
django.setup()

from productos.models import Categoria, Producto

def test_backend():
    print("🔍 Probando el backend...")
    
    # Verificar categorías
    categorias = Categoria.objects.all()
    print(f"📂 Categorías encontradas: {categorias.count()}")
    for cat in categorias:
        print(f"  - {cat.id}: {cat.nombre}")
    
    # Verificar productos
    productos = Producto.objects.all()
    print(f"🛍️ Productos encontrados: {productos.count()}")
    for prod in productos:
        print(f"  - {prod.id}: {prod.nombre} - ${prod.precio} - Imagen: {prod.imagen}")
    
    # Crear una categoría de prueba si no existe
    if not categorias.exists():
        print("📝 Creando categoría de prueba...")
        categoria = Categoria.objects.create(nombre="Vestidos")
        print(f"✅ Categoría creada: {categoria.nombre}")
    
    print("✅ Backend funcionando correctamente!")

if __name__ == "__main__":
    test_backend()
