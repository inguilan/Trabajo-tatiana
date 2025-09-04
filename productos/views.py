from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Producto, Categoria, Carrito, CarritoItem
from .serializers import ProductoSerializer, CategoriaSerializer, CarritoSerializer, CarritoItemSerializer
import django_filters

# Filtro personalizado para los productos
class ProductoFilter(django_filters.FilterSet):
    categoria = django_filters.ModelChoiceFilter(queryset=Categoria.objects.all())
    precio_min = django_filters.NumberFilter(field_name="precio", lookup_expr='gte')
    precio_max = django_filters.NumberFilter(field_name="precio", lookup_expr='lte')
    talla = django_filters.CharFilter(field_name="tallas_disponibles", lookup_expr='icontains')

    class Meta:
        model = Producto
        fields = ['categoria', 'precio_min', 'precio_max', 'talla']


class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductoFilter  # Aplica el filtro personalizado

    def get_queryset(self):
        user = self.request.user
        if self.request.method == 'GET' and not user.is_staff:
            return Producto.objects.filter(publicado=True)
        return Producto.objects.all()


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class CarritoViewSet(viewsets.ModelViewSet):
    queryset = Carrito.objects.all()
    serializer_class = CarritoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Carrito.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(detail=True, methods=['post'])
    def agregar_producto(self, request, pk=None):
        carrito = self.get_object()
        producto_id = request.data.get('producto_id')
        cantidad = request.data.get('cantidad', 1)

        try:
            producto = Producto.objects.get(id=producto_id)
            carrito_item, created = CarritoItem.objects.get_or_create(
                carrito=carrito, producto=producto,
                defaults={'cantidad': cantidad}
            )

            if not created:
                carrito_item.cantidad += cantidad
                carrito_item.save()

            return Response({"message": "Producto agregado al carrito."})
        except Producto.DoesNotExist:
            return Response({"error": "Producto no encontrado."}, status=404)

    @action(detail=True, methods=['post'])
    def eliminar_producto(self, request, pk=None):
        carrito = self.get_object()
        producto_id = request.data.get('producto_id')

        try:
            carrito_item = CarritoItem.objects.get(carrito=carrito, producto_id=producto_id)
            carrito_item.delete()

            return Response({"message": "Producto eliminado del carrito."})
        except CarritoItem.DoesNotExist:
            return Response({"error": "Producto no encontrado en el carrito."}, status=404)


class CarritoItemViewSet(viewsets.ModelViewSet):
    queryset = CarritoItem.objects.all()
    serializer_class = CarritoItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CarritoItem.objects.filter(carrito__usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(carrito=self.request.user.carrito)  # Asumimos que cada usuario tiene solo un carrito.
