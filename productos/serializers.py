from rest_framework import serializers
from .models import Producto, Categoria
from .models import Carrito, CarritoItem, Producto


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    # Cambiar 'image' por 'imagen' para que coincida con el modelo
    imagen = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = '__all__'

    def get_imagen(self, obj):
        # Ahora usamos 'imagen' en lugar de 'image'
        if obj.imagen:
            return self.context['request'].build_absolute_uri(obj.imagen.url)
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