from django.db import models
from tinymce.models import HTMLField

from app.models.base import TimestampedModel


class Team(TimestampedModel):
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    image = models.ImageField(upload_to="team/", blank=True, null=True)
    short_intro = models.TextField(blank=True, null=True)
    bio = HTMLField()
    phone_no = models.CharField(max_length=10, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.position}"
