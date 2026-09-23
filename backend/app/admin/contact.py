from django.contrib import admin

from app.models.contact import Contact


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = (
        "subject",
        "name",
        "phone_no",
        "email",
        "created_at",
    )

    list_display_links = (
        "subject",
        "name",
    )

    search_fields = (
        "name",
        "phone_no",
        "email",
        "subject",
        "message",
    )

    list_filter = (
        "created_at",
        "updated_at",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = ("-created_at",)

    list_per_page = 25

    fieldsets = (
        (
            "Contact Information",
            {
                "fields": (
                    "name",
                    "phone_no",
                    "email",
                ),
            },
        ),
        (
            "Message",
            {
                "fields": (
                    "subject",
                    "message",
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
