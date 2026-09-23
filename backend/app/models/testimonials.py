from django.db import models

from app.models.base import TimestampedModel


class Testimonial(TimestampedModel):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    testimonial = models.TextField()
    organization = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Testimonials"
