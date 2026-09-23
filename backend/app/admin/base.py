from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe


class SingletonAdmin(admin.ModelAdmin):
    """
    Admin base class for singleton content.
    Only one record is allowed.
    """

    save_on_top = True

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    def has_add_permission(self, request):
        """
        Prevent creating a second singleton record.
        """

        return not self.model.objects.exists()


class ImagePreviewMixin:
    """
    Mixin providing reusable image thumbnail/preview helpers for the admin.
    """

    @staticmethod
    def _thumb(obj, field_name, width=70, height=50):
        image = getattr(obj, field_name, None)
        if not image:
            return mark_safe('<span style="color: #9ca3af;">No image</span>')

        return format_html(
            '<img src="{}" width="{}" height="{}" '
            'style="object-fit: cover; border-radius: 6px;" />',
            image.url,
            width,
            height,
        )

    @staticmethod
    def _preview(obj, field_name, width=300, height=200):
        image = getattr(obj, field_name, None)
        if not image:
            return mark_safe('<span style="color: #9ca3af;">No image uploaded.</span>')

        return format_html(
            '<img src="{}" width="{}" height="{}" '
            'style="object-fit: cover; border-radius: 8px;" />',
            image.url,
            width,
            height,
        )

    @staticmethod
    def _logo_preview(obj, field_name="logo"):
        image = getattr(obj, field_name, None)
        if not image:
            return mark_safe('<span style="color: #9ca3af;">No logo uploaded.</span>')

        return format_html(
            '<img src="{}" width="150" height="150" '
            'style="object-fit: contain; border-radius: 8px; '
            'border: 1px solid #e5e7eb; padding: 5px;" />',
            image.url,
        )
