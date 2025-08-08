from django.db import models

from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='productos/')
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    publicado = models.BooleanField(default=False)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    tallas_disponibles = models.CharField(max_length=100)  # Ejemplo: "S,M,L,XL"

    def __str__(self):
        return self.nombre

