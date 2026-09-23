from rest_framework import viewsets

from app.models import Team

from .serializers import TeamSerializer


class TeamViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Team.objects.order_by("-created_at")
    serializer_class = TeamSerializer
    search_fields = ("name", "position", "email")
    ordering_fields = ("created_at", "name", "position")
