from rest_framework import viewsets

from app.models import HeroSection, MarqueeService, Stats

from .serializers import (
    HeroSectionSerializer,
    MarqueeServiceSerializer,
    StatsSerializer,
)


class HeroSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroSection.objects.order_by("-created_at")
    serializer_class = HeroSectionSerializer


class StatsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stats.objects.order_by("-created_at")
    serializer_class = StatsSerializer


class MarqueeServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MarqueeService.objects.order_by("-created_at")
    serializer_class = MarqueeServiceSerializer
