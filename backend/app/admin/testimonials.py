from django.contrib import admin

from app.admin.base import ImagePreviewMixin
from app.models.testimonials import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = (
        "image_thumb",
        "name",
        "organization",
        "testimonial_preview",
        "updated_at",
    )

    list_display_links = (
        "image_thumb",
        "name",
    )

    search_fields = (
        "name",
        "organization",
        "testimonial",
    )

    list_filter = (
        "organization",
        "created_at",
        "updated_at",
    )

    readonly_fields = (
        "image_preview",
        "created_at",
        "updated_at",
    )

    list_per_page = 25

    fieldsets = (
        (
            "Customer Information",
            {
                "fields": (
                    "name",
                    "organization",
                    "image",
                    "image_preview",
                ),
                "description": (
                    "Basic information about the customer providing the testimonial."
                ),
            },
        ),
        (
            "Testimonial",
            {
                "fields": ("testimonial",),
                "description": (
                    "The testimonial message displayed on the website."
                ),
            },
        ),
        (
            "Metadata",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                ),
                "classes": ("collapse",),
            },
        ),
    )

    @admin.display(description="Photo")
    def image_thumb(self, obj):
        return self._thumb(obj, "image")

    @admin.display(description="Profile Image")
    def image_preview(self, obj):
        return self._preview(obj, "image", width=150, height=150)

    @admin.display(description="Message")
    def testimonial_preview(self, obj):
        if len(obj.testimonial) > 80:
            return f"{obj.testimonial[:80]}..."
        return obj.testimonial
