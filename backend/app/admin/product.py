from django.contrib import admin
from django.db.models import Count

from app.admin.base import ImagePreviewMixin
from app.models.products import Product, ProductFeatures


class ProductFeaturesInline(admin.TabularInline):
    model = ProductFeatures
    extra = 1

    fields = ("name",)

    ordering = ("id",)


@admin.register(Product)
class ProductAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = (
        "image_thumb",
        "name",
        "feature_count",
        "updated_at",
    )

    list_display_links = (
        "image_thumb",
        "name",
    )

    search_fields = (
        "name",
        "features__name",
    )

    list_filter = (
        "created_at",
        "updated_at",
    )

    readonly_fields = (
        "image_preview",
        "created_at",
        "updated_at",
    )

    inlines = (ProductFeaturesInline,)

    list_per_page = 25

    save_on_top = True

    fieldsets = (
        (
            "Product Information",
            {
                "fields": (
                    "name",
                    "image",
                    "image_preview",
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

    @admin.display(description="Image")
    def image_thumb(self, obj):
        return self._thumb(obj, "image")

    @admin.display(description="Image")
    def image_preview(self, obj):
        return self._preview(obj, "image", width=350, height=220)

    @admin.display(
        description="Features",
        ordering="feature_count",
    )
    def feature_count(self, obj):
        return obj.feature_count

    def get_queryset(self, request):
        # Annotate once to avoid N+1 (per-row features.count()) and to make
        # ordering="feature_count" resolve to a real DB expression.
        return super().get_queryset(request).annotate(
            feature_count=Count("features")
        )
