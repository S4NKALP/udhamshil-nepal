from rest_framework import viewsets

from app.models import Testimonial

from .serializers import TestimonialSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.order_by("-created_at")
    serializer_class = TestimonialSerializer
    search_fields = ("name", "organization")
    ordering_fields = ("created_at", "name")
