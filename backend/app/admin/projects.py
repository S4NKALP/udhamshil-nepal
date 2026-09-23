from django.contrib import admin

from app.admin.base import ImagePreviewMixin
from app.models.projects import Events, Project


class _ProjectLikeAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = (
        "image_thumb",
        "name",
        "organization",
        "updated_at",
    )

    list_display_links = (
        "image_thumb",
        "name",
    )

    search_fields = (
        "name",
        "organization",
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
            "Details",
            {
                "fields": (
                    "name",
                    "organization",
                    "image",
                    "image_preview",
                ),
            },
        ),
        (
            "Summary",
            {
                "fields": ("short_info",),
            },
        ),
        (
            "Full Description",
            {
                "fields": ("details",),
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

    @admin.display(description="Image")
    def image_thumb(self, obj):
        return self._thumb(obj, "image")

    @admin.display(description="Image")
    def image_preview(self, obj):
        return self._preview(obj, "image", width=350, height=220)


@admin.register(Project)
class ProjectAdmin(_ProjectLikeAdmin):
    pass


@admin.register(Events)
class EventsAdmin(_ProjectLikeAdmin):
    pass
