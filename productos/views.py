from django.shortcuts import render

from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Producto, Categoria
from .serializers import ProductoSerializer, CategoriaSerializer

from django_filters.rest_framework import DjangoFilterBackend

class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['categoria']

    def get_queryset(self):
        user = self.request.user
        if self.request.method == 'GET' and not user.is_staff:
            return Producto.objects.filter(publicado=True)
        return Producto.objects.all()


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

