from rest_framework import serializers
from .models import Producto, Categoria
from .models import Carrito, CarritoItem, Producto


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(required=False, allow_null=True)
    imagen_url = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = '__all__'

    def get_imagen_url(self, obj):
        req = self.context.get('request')
        if obj.imagen and hasattr(obj.imagen, 'url'):
            return req.build_absolute_uri(obj.imagen.url) if req else obj.imagen.url
        return None

class CarritoItemSerializer(serializers.ModelSerializer):
    producto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all())

    class Meta:
        model = CarritoItem
        fields = ['id', 'producto', 'cantidad']

class CarritoSerializer(serializers.ModelSerializer):
    items = CarritoItemSerializer(many=True, read_only=True)

    class Meta:
        model = Carrito
        fields = ['id', 'usuario', 'creado', 'items']