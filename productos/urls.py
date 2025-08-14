from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProductoViewSet, CategoriaViewSet
from .views import CarritoViewSet, CarritoItemViewSet

router = DefaultRouter()
router.register(r'productos', ProductoViewSet, basename='producto')
router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'carritos', CarritoViewSet)
router.register(r'carrito-items', CarritoItemViewSet)


urlpatterns = router.urls
