from rest_framework import viewsets

from app.models import Product

from .serializers import ProductSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.prefetch_related("features").order_by("-created_at")
    serializer_class = ProductSerializer
    search_fields = ("name",)
    ordering_fields = ("created_at", "name")
