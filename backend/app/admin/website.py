from django.contrib import admin

from app.admin.base import ImagePreviewMixin, SingletonAdmin
from app.models.homepage import HeroSection, MarqueeService, Stats


@admin.register(HeroSection)
class HeroSectionAdmin(ImagePreviewMixin, SingletonAdmin):
    list_display = (
        "section_name",
        "title",
        "updated_at",
    )

    readonly_fields = (
        "cover_image_preview",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Hero Section",
            {
                "fields": (
                    "title",
                    "subtitle",
                    "hero_section",
                    "cover_image",
                    "cover_image_preview",
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

    @admin.display(description="Section")
    def section_name(self, obj):
        return "Hero Section"

    @admin.display(description="Cover Image")
    def cover_image_preview(self, obj):
        return self._preview(obj, "cover_image", width=400, height=220)


@admin.register(Stats)
class StatsAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "stats",
        "updated_at",
    )

    list_display_links = ("title",)

    search_fields = ("title",)

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Stat Details",
            {
                "fields": (
                    "title",
                    "stats",
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


@admin.register(MarqueeService)
class MarqueeServiceAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "updated_at",
    )

    list_display_links = ("title",)

    search_fields = ("title",)

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Service Details",
            {
                "fields": ("title",),
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
