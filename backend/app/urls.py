"""generated with djinit"""

from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve
from app.views import index

urlpatterns = [
    path("admin/", admin.site.urls),
    path("tinymce/", include("tinymce.urls")),
    path("api/", include("app.api.urls")),
]

urlpatterns += [
    re_path(
        r"^media/(?P<path>.*)$",
        serve,
        {"document_root": settings.MEDIA_ROOT},
    ),
    re_path(r"^(?!(?:api|admin|tinymce|media|static)(?:/|$)).*$", index, name="index"),
]
