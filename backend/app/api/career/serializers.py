from rest_framework import serializers

from app.models import Career


class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

from app.models.career import CareerApplication

class CareerApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerApplication
        fields = "__all__"
