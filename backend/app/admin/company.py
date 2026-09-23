from django.contrib import admin

from app.admin.base import ImagePreviewMixin, SingletonAdmin
from app.models.org import (
    AboutUs,
    Mision,
    Organization,
    OurService,
    Patner,
    SisterCompanies,
    Values,
    Vision,
    WhatWeDo,
)


class _SectionSingletonAdmin(SingletonAdmin, admin.ModelAdmin):
    list_display = (
        "section_name",
        "updated_at",
    )

    @admin.display(description="Section")
    def section_name(self, obj):
        return self.section_title


@admin.register(Organization)
class OrganizationAdmin(ImagePreviewMixin, SingletonAdmin):
    list_display = (
        "name",
        "primary_email",
        "phone_number",
        "updated_at",
    )

    readonly_fields = (
        "logo_preview",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Organization Information",
            {
                "fields": (
                    "name",
                    "short_intro",
                    "logo",
                    "logo_preview",
                ),
            },
        ),
        (
            "Contact Information",
            {
                "fields": (
                    "address",
                    ("phone_number", "telephone_number"),
                    ("primary_email", "secondary_email"),
                    "whatsapp_no",
                ),
            },
        ),
        (
            "Social Media",
            {
                "fields": (
                    ("facebook", "tiktok"),
                    ("instagram", "youtube"),
                    "linkedin",
                ),
            },
        ),
        (
            "Other",
            {
                "fields": (
                    "working_hour",
                    "google_map_link",
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

    @admin.display(description="Logo")
    def logo_preview(self, obj):
        return self._logo_preview(obj)


@admin.register(AboutUs)
class AboutUsAdmin(ImagePreviewMixin, _SectionSingletonAdmin):
    section_title = "About Us"

    readonly_fields = (
        "cover_image_preview",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "About Us",
            {
                "fields": (
                    "title",
                    "subtitle",
                    "about_us",
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

    @admin.display(description="Cover Image")
    def cover_image_preview(self, obj):
        return self._preview(obj, "cover_image")


@admin.register(Vision)
class VisionAdmin(ImagePreviewMixin, _SectionSingletonAdmin):
    section_title = "Vision"

    readonly_fields = (
        "cover_image_preview",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Vision",
            {
                "fields": (
                    "title",
                    "subtitle",
                    "vision",
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

    @admin.display(description="Cover Image")
    def cover_image_preview(self, obj):
        return self._preview(obj, "cover_image")


@admin.register(Mision)
class MisionAdmin(ImagePreviewMixin, _SectionSingletonAdmin):
    section_title = "Mision"

    readonly_fields = (
        "cover_image_preview",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Mision",
            {
                "fields": (
                    "title",
                    "subtitle",
                    "mision",
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

    @admin.display(description="Cover Image")
    def cover_image_preview(self, obj):
        return self._preview(obj, "cover_image")


@admin.register(Values)
class ValuesAdmin(ImagePreviewMixin, _SectionSingletonAdmin):
    section_title = "Values"

    readonly_fields = (
        "cover_image_preview",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Values",
            {
                "fields": (
                    "title",
                    "subtitle",
                    "values",
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

    @admin.display(description="Cover Image")
    def cover_image_preview(self, obj):
        return self._preview(obj, "cover_image")


@admin.register(WhatWeDo)
class WhatWeDoAdmin(ImagePreviewMixin, _SectionSingletonAdmin):
    section_title = "What We Do"

    readonly_fields = (
        "cover_image_preview",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "What We Do",
            {
                "fields": (
                    "title",
                    "subtitle",
                    "what_we_do",
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

    @admin.display(description="Cover Image")
    def cover_image_preview(self, obj):
        return self._preview(obj, "cover_image")


@admin.register(Patner)
class PatnerAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = (
        "name",
        "logo_thumb",
        "updated_at",
    )

    list_display_links = ("name",)

    search_fields = ("name",)

    readonly_fields = (
        "logo_preview",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Partner Details",
            {
                "fields": (
                    "name",
                    "logo",
                    "logo_preview",
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

    @admin.display(description="Logo")
    def logo_thumb(self, obj):
        return self._thumb(obj, "logo")

    @admin.display(description="Logo")
    def logo_preview(self, obj):
        return self._logo_preview(obj)


@admin.register(SisterCompanies)
class SisterCompaniesAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = (
        "name",
        "logo_thumb",
        "website_link",
        "updated_at",
    )

    list_display_links = ("name",)

    search_fields = ("name",)

    readonly_fields = (
        "logo_preview",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Company Details",
            {
                "fields": (
                    "name",
                    "logo",
                    "logo_preview",
                    "website_link",
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

    @admin.display(description="Logo")
    def logo_thumb(self, obj):
        return self._thumb(obj, "logo")

    @admin.display(description="Logo")
    def logo_preview(self, obj):
        return self._logo_preview(obj)


@admin.register(OurService)
class OurServiceAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = (
        "name",
        "image_thumb",
        "updated_at",
    )

    list_display_links = ("name",)

    search_fields = ("name",)

    readonly_fields = (
        "image_preview",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Service Details",
            {
                "fields": (
                    "name",
                    "image",
                    "image_preview",
                ),
            },
        ),
        (
            "Description",
            {
                "fields": ("description",),
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
        return self._preview(obj, "image")
