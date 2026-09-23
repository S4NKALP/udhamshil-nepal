from django.db import IntegrityError, models
from django.forms import ValidationError
from tinymce.models import HTMLField

from app.models.base import TimestampedModel


class Organization(TimestampedModel):
    # Fixed primary key; the PK index is the DB-level guard that makes the
    # "single row" guarantee race-free (concurrent INSERTs collide on pk).
    SINGLETON_PK = 1

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

    working_hour = models.CharField(
        max_length=255, default="Sunday – Friday, 10AM to 6PM"
    )

    google_map_link = models.URLField(blank=True)

    def save(self, *args, **kwargs):
        if self._state.adding and Organization.objects.exists():
            raise ValidationError("Only one Organization record is allowed.")

        if self._state.adding:
            # Force the fixed primary key so the DB PK constraint, not a
            # check-then-insert guard, serializes concurrent creates. The
            # loser of the race hits IntegrityError below.
            self.pk = Organization.SINGLETON_PK

        try:
            return super().save(*args, **kwargs)
        except IntegrityError:
            # Lost a race: a concurrent request created the singleton
            # between our exists() check and the INSERT. Surface as a
            # clean error instead of a 500 / duplicate row.
            raise ValidationError("Only one Organization record is allowed.") from None

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Organization"


class AboutUs(TimestampedModel):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    about_us = HTMLField()
    cover_image = models.ImageField(upload_to="aboutus/", blank=True, null=True)

    def __str__(self):
        return "About Us"

    class Meta:
        verbose_name_plural = "About Us"


class Vision(TimestampedModel):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    vision = HTMLField()
    cover_image = models.ImageField(upload_to="vision/", blank=True, null=True)

    def __str__(self):
        return "Vision"

    class Meta:
        verbose_name_plural = "Vision"


class Mision(TimestampedModel):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    mision = HTMLField()
    cover_image = models.ImageField(upload_to="mision/", blank=True, null=True)

    def __str__(self):
        return "Mision"

    class Meta:
        verbose_name_plural = "Mision"


class Values(TimestampedModel):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    values = HTMLField()
    cover_image = models.ImageField(upload_to="values/", blank=True, null=True)

    def __str__(self):
        return "Values"

    class Meta:
        verbose_name_plural = "Values"


class WhatWeDo(TimestampedModel):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    what_we_do = HTMLField()
    cover_image = models.ImageField(upload_to="whatwedo/", blank=True, null=True)

    def __str__(self):
        return "What We Do"

    class Meta:
        verbose_name_plural = "What We Do"


class Patner(TimestampedModel):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="patner/", blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Partner"


class SisterCompanies(TimestampedModel):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="sistercompanies/", blank=True, null=True)
    website_link = models.URLField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Sister Companies"


class OurService(TimestampedModel):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="ourservice/", blank=True, null=True)
    description = HTMLField()
