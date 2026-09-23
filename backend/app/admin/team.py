from django.contrib import admin

from app.admin.base import ImagePreviewMixin
from app.models.team import Team


@admin.register(Team)
class TeamAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = (
        "image_thumb",
        "name",
        "position",
        "email",
        "phone_no",
        "updated_at",
    )

    list_display_links = (
        "image_thumb",
        "name",
    )

    search_fields = (
        "name",
        "position",
        "email",
        "phone_no",
        "bio",
    )

    list_filter = (
        "position",
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
            "Basic Information",
            {
                "fields": (
                    "name",
                    "position",
                    "image",
                    "image_preview",
                ),
            },
        ),
        (
            "Introduction",
            {
                "fields": ("short_intro",),
            },
        ),
        (
            "Biography",
            {
                "fields": ("bio",),
            },
        ),
        (
            "Contact Information",
            {
                "fields": (
                    "phone_no",
                    "email",
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
