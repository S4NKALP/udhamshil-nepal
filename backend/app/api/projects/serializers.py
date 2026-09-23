from rest_framework import serializers

from app.models import Events, Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")
