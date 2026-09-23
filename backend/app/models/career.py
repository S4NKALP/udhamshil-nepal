from django.db import models
from tinymce.models import HTMLField

from app.models.base import TimestampedModel


class Career(TimestampedModel):
    name = models.CharField(max_length=255)
    short_info = models.TextField()
    job_time = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    deadline = models.TimeField()
    details = HTMLField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Careers"
