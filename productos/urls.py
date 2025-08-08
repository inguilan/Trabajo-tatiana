from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProductoViewSet, CategoriaViewSet

router = DefaultRouter()
router.register(r'productos', ProductoViewSet, basename='producto')
router.register(r'categorias', CategoriaViewSet, basename='categoria')

urlpatterns = router.urls
