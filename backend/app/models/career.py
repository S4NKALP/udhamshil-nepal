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


class CareerApplication(TimestampedModel):
    role_title = models.CharField(max_length=255, blank=True, null=True)
    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=30)
    message = models.TextField(blank=True)
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)

    def __str__(self):
        return f"{self.full_name} - {self.role_title}"

    class Meta:
        verbose_name_plural = "Career Applications"
