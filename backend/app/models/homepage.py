from django.db import models
from tinymce.models import HTMLField

from app.models.base import TimestampedModel


class HeroSection(TimestampedModel):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    hero_section = HTMLField()
    cover_image = models.ImageField(upload_to="hero/", blank=True, null=True)

    def __str__(self):
        return "Hero Section"

    class Meta:
        verbose_name_plural = "Hero Section"


class Stats(TimestampedModel):
    title = models.CharField(max_length=255)
    stats = models.PositiveIntegerField(default=100)

    def __str__(self):
        return "Stats"

    class Meta:
        verbose_name_plural = "Stats"


class MarqueeService(TimestampedModel):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "MarqueeService"
