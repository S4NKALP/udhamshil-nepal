from django.db import models

from app.models.base import TimestampedModel


class Contact(TimestampedModel):
    name = models.CharField(max_length=255)
    phone_no = models.CharField(max_length=10, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    subject = models.CharField(max_length=255)
    message = models.TextField()

    def __str__(self):
        return f"{self.name} - {self.phone_no or self.email} - {self.subject}"

    class Meta:
        verbose_name_plural = "Contacts"
