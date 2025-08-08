📦 E-Commerce Backend (Django + DRF)
Este proyecto es el backend de un sistema de e-commerce de ropa, desarrollado con Django y Django REST Framework (DRF). Permite gestionar productos, categorías, y publicaciones desde un panel de administración, y expone una API REST para el frontend.

🚀 Características
CRUD completo de productos y categorías

API RESTful para consumir desde frontend

Panel de administración para superusuario

Soporte para imágenes de productos

Filtro por productos publicados

Conexión con frontend en React (o cualquier cliente)

🛠️ Tecnologías
Python 3.11+

Django 4+

Django REST Framework

SQLite (puede cambiarse por PostgreSQL)

CORS Headers

Pillow (para imágenes)

📁 Estructura del proyecto
bash
Copiar
Editar
ecommerce-backend/
│
├── manage.py
├── ecommerce/             # Configuración del proyecto
│
├── tienda/                # App principal: productos y categorías
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│
├── media/                 # Carpeta para imágenes de productos
└── requirements.txt
⚙️ Instalación
Clona el repositorio

bash
Copiar
Editar
git clone https://github.com/tu-usuario/ecommerce-backend.git
cd ecommerce-backend
Crea y activa un entorno virtual

bash
Copiar
Editar
python -m venv env
source env/bin/activate  # En Windows: env\Scripts\activate
Instala dependencias

bash
Copiar
Editar
pip install -r requirements.txt
Aplica migraciones

bash
Copiar
Editar
python manage.py migrate
Crea un superusuario (opcional pero recomendado)

bash
Copiar
Editar
python manage.py createsuperuser
Inicia el servidor

bash
Copiar
Editar
python manage.py runserver
🔗 Endpoints principales
Método	Ruta	Descripción
GET	/api/productos/	Lista de productos (JSON)
GET	/api/productos/<id>/	Detalle de producto
POST	/api/productos/	Crear nuevo producto (admin)
PUT	/api/productos/<id>/	Editar producto (admin)
DELETE	/api/productos/<id>/	Eliminar producto (admin)
GET	/api/categorias/	Lista de categorías

🌐 Acceso al admin
Visita http://localhost:8000/admin y accede con el superusuario que creaste.

🖼️ Subida de imágenes
Las imágenes se almacenan en la carpeta media/. Asegúrate de tener configurado esto en settings.py:

python
Copiar
Editar
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
Y en urls.py del proyecto:

python
Copiar
Editar
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    ...
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
🔐 CORS para frontend
Si estás consumiendo esta API desde React u otro frontend, asegúrate de permitir el dominio en settings.py:

python
Copiar
Editar
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOW_ALL_ORIGINS = True  # Solo en desarrollo