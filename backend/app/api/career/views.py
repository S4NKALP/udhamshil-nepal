from rest_framework import viewsets

from app.models import Career

from .serializers import CareerSerializer


class CareerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Career.objects.order_by("-created_at")
    serializer_class = CareerSerializer
    filterset_fields = ("job_time", "location")
    search_fields = ("name", "job_time", "location")
    ordering_fields = ("created_at", "deadline")

from app.models.career import CareerApplication
from .serializers import CareerApplicationSerializer

class CareerApplicationViewSet(viewsets.ModelViewSet):
    queryset = CareerApplication.objects.all()
    serializer_class = CareerApplicationSerializer
    # Allow unauthenticated users to apply
    authentication_classes = []
    permission_classes = []
