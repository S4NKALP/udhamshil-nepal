from django.db import models
from django.forms import ValidationError

from app.models.base import TimestampedModel


class Organization(TimestampedModel):
    name = models.CharField(max_length=255)
    short_intro = models.TextField(blank=True, default="")
    logo = models.ImageField(upload_to="institue/", blank=True, null=True)

    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=10, blank=True)
    telephone_number = models.CharField(max_length=10, blank=True)
    primary_email = models.EmailField(blank=True)
    secondary_email = models.EmailField(blank=True)
    whatsapp_no = models.CharField(max_length=10, blank=True)

    facebook = models.URLField(blank=True)
    tiktok = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    youtube = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)

    working_hour = models.CharField(max_length=255, blank=True)

    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True)

    def save(self, *args, **kwargs):
        if not self.pk and Organization.objects.exists():
            raise ValidationError("Only one Organization record is allowed.")
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Organization"


class AboutUs(TimestampedModel):
    about_us = HTMLField()
    cover_image = models.ImageField(upload_to="aboutus/", blank=True, null=True)

    def __str__(self):
        return "About Us"

    class Meta:
        verbose_name_plural = "About Us"


class Vision(TimestampedModel):
    vision = HTMLField()
    cover_image = models.ImageField(upload_to="vision/", blank=True, null=True)

    def __str__(self):
        return "Vision"

    class Meta:
        verbose_name_plural = "Vision"


class Mision(TimestampedModel):
    mision = HTMLField()
    cover_image = models.ImageField(upload_to="mision/", blank=True, null=True)

    def __str__(self):
        return "Mision"

    class Meta:
        verbose_name_plural = "Mision"


class Values(TimestampedModel):
    values = HTMLField()
    cover_image = models.ImageField(upload_to="values/", blank=True, null=True)

    def __str__(self):
        return "Values"

    class Meta:
        verbose_name_plural = "Values"


class Patner(TimestampedModel):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="patner/", blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Patner"
