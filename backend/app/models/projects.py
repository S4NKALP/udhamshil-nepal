from django.db import models
from tinymce.models import HTMLField

from app.models.base import TimestampedModel


class Project(TimestampedModel):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    short_info = models.TextField()
    details = HTMLField()
    organization = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Projects"


class Events(TimestampedModel):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="events/", blank=True, null=True)
    short_info = models.TextField()
    details = HTMLField()
    organization = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Events"
