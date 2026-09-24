from django.contrib import admin

from app.models.career import Career


@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "job_time",
        "location",
        "deadline",
        "updated_at",
    )

    list_display_links = ("name",)

    search_fields = (
        "name",
        "job_time",
        "location",
    )

    list_filter = (
        "job_time",
        "location",
        "created_at",
        "updated_at",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    list_per_page = 25

    fieldsets = (
        (
            "Job Overview",
            {
                "fields": (
                    "name",
                    "short_info",
                ),
            },
        ),
        (
            "Employment Details",
            {
                "fields": (
                    "job_time",
                    "location",
                    "deadline",
                ),
            },
        ),
        (
            "Job Description",
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

from app.models.career import CareerApplication

@admin.register(CareerApplication)
class CareerApplicationAdmin(admin.ModelAdmin):
    list_display = ("full_name", "role_title", "email", "phone", "created_at")
    list_filter = ("role_title", "created_at")
    search_fields = ("full_name", "email", "phone", "role_title")
    readonly_fields = ("created_at", "updated_at")
