from rest_framework import serializers

from app.models import Product, ProductFeatures


class ProductFeaturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFeatures
        fields = ("id", "name")


class ProductSerializer(serializers.ModelSerializer):
    features = ProductFeaturesSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ("id", "name", "image", "features", "created_at", "updated_at")
        read_only_fields = ("created_at", "updated_at")
