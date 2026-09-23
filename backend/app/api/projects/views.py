from rest_framework import viewsets

from app.models import Events, Project

from .serializers import EventsSerializer, ProjectSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.order_by("-created_at")
    serializer_class = ProjectSerializer
    filterset_fields = ("organization",)
    search_fields = ("name", "organization")
    ordering_fields = ("created_at", "name")


class EventsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Events.objects.order_by("-created_at")
    serializer_class = EventsSerializer
    search_fields = ("name", "organization")
    ordering_fields = ("created_at", "name")
