from rest_framework import serializers

from app.models import HeroSection, MarqueeService, Stats


class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class StatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stats
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class MarqueeServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarqueeService
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")
