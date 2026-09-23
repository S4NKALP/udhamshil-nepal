from django.db import models

from app.models.base import TimestampedModel


class Product(TimestampedModel):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="products/", blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Products"


class ProductFeatures(TimestampedModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="features"
    )
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
