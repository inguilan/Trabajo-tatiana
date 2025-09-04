# Tienda Tatiana - Sistema de E-commerce

## Descripción
Sistema de tienda online desarrollado con Django (backend) y Next.js (frontend) que incluye un panel administrativo completo, gestión de productos y carrito de compras.

## Características Implementadas

### 🛍️ Tienda Principal
- **Catálogo de productos**: Visualización de productos con filtros por categoría y precio
- **Vista de detalles**: Página completa de detalles de cada producto
- **Carrito de compras**: Sistema completo de carrito con gestión de cantidades
- **Lista de deseos**: Funcionalidad para guardar productos favoritos
- **Diseño responsivo**: Optimizado para dispositivos móviles y desktop

### 🔐 Panel Administrativo
- **Autenticación segura**: Sistema de login para administradores
- **Gestión de productos**: Crear, editar, eliminar y publicar/ocultar productos
- **Dashboard**: Estadísticas de productos y categorías
- **Acceso restringido**: Solo usuarios administradores pueden acceder

### 🛒 Funcionalidades del Carrito
- **Agregar productos**: Desde la vista principal o detalles del producto
- **Gestión de cantidades**: Aumentar/disminuir cantidades
- **Eliminar productos**: Remover productos individuales
- **Vaciar carrito**: Limpiar todo el carrito
- **Cálculo de totales**: Precio total automático
- **Página completa**: Vista detallada del carrito

## Instalación y Configuración

### Backend (Django)
```bash
cd tienda_backend
python -m venv env
source env/bin/activate  # En Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (Next.js)
```bash
cd tienda-ropa-mejorada
npm install
npm run dev
```

## Credenciales de Administrador

**Usuario**: admin  
**Contraseña**: admin123

## Estructura del Proyecto

```
tienda_backend/
├── productos/           # App de Django para productos
│   ├── models.py       # Modelos de Producto, Categoría, Carrito
│   ├── views.py        # API endpoints
│   └── serializers.py  # Serializadores para la API
├── tienda_backend/     # Configuración principal de Django
└── media/              # Archivos de imágenes de productos

tienda-ropa-mejorada/
├── app/
│   ├── admin/          # Panel administrativo
│   ├── productos/[id]/ # Páginas de detalles de productos
│   ├── carrito/        # Página del carrito
│   └── page.tsx        # Página principal
├── components/
│   ├── admin/          # Componentes del panel administrativo
│   ├── ui/             # Componentes de UI reutilizables
│   └── ...             # Otros componentes
├── context/            # Contextos de React (Auth, Cart, etc.)
├── hooks/              # Hooks personalizados
└── lib/                # Utilidades y configuraciones
```

## API Endpoints

### Productos
- `GET /api/productos/` - Listar productos
- `GET /api/productos/{id}/` - Obtener producto específico
- `POST /api/productos/` - Crear producto (admin)
- `PUT /api/productos/{id}/` - Actualizar producto (admin)
- `DELETE /api/productos/{id}/` - Eliminar producto (admin)

### Categorías
- `GET /api/categorias/` - Listar categorías
- `GET /api/categorias/{id}/` - Obtener categoría específica

### Carrito
- `GET /api/carritos/` - Obtener carrito del usuario
- `POST /api/carritos/` - Crear carrito
- `POST /api/carritos/{id}/agregar_producto/` - Agregar producto al carrito
- `POST /api/carritos/{id}/eliminar_producto/` - Eliminar producto del carrito

## Funcionalidades del Panel Administrativo

### Dashboard
- Estadísticas de productos totales
- Productos publicados vs ocultos
- Número de categorías

### Gestión de Productos
- **Crear productos**: Formulario completo con validación
- **Editar productos**: Modificar información existente
- **Publicar/Ocultar**: Control de visibilidad de productos
- **Eliminar productos**: Remover productos permanentemente
- **Vista previa**: Ver cómo se ven los productos en la tienda

### Características de Seguridad
- Autenticación requerida para todas las operaciones administrativas
- Validación de formularios en frontend y backend
- Protección contra acceso no autorizado

## Tecnologías Utilizadas

### Backend
- **Django 5.2.5**: Framework web de Python
- **Django REST Framework**: API REST
- **Django CORS Headers**: Manejo de CORS
- **Django Filter**: Filtrado de datos
- **SQLite**: Base de datos (desarrollo)

### Frontend
- **Next.js 15.2.4**: Framework de React
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de CSS
- **Radix UI**: Componentes de UI
- **Lucide React**: Iconos
- **Zustand**: Gestión de estado

## Próximas Mejoras

- [ ] Sistema de autenticación de usuarios
- [ ] Proceso de checkout completo
- [ ] Gestión de pedidos
- [ ] Sistema de pagos
- [ ] Notificaciones por email
- [ ] Panel de analíticas avanzado
- [ ] Gestión de inventario
- [ ] Sistema de cupones y descuentos

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
