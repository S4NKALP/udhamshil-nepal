"""generated with djinit"""

from django.contrib import admin
from django.urls import path, re_path
from django.conf import settings
from django.views.static import serve
from django.urls import include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    # JWT tokens
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/blacklist/", TokenBlacklistView.as_view(), name="token_blacklist"),
    # path("api/", include("app.api.urls")),
]

# Don't show schema in production
if settings.DEBUG:
    schema_view = get_schema_view(
        openapi.Info(
            title=". API",
            default_version="v1",
        ),
        public=True,
    )
    urlpatterns += [
        path("docs/", schema_view.with_ui("swagger", cache_timeout=0)),
        path("schema/", schema_view.with_ui("redoc", cache_timeout=0)),
    ]

urlpatterns += [
    re_path(
        r"^media/(?P<path>.*)$",
        serve,
        {"document_root": settings.MEDIA_ROOT},
    ),
]