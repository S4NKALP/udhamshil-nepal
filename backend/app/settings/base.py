"""
generated with djinit
Common settings shared between development and production environment
"""

from pathlib import Path

import environ

env_path = Path(__file__).resolve().parent.parent.parent / ".env"
env = environ.Env()
environ.Env.read_env(env_path)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/6.1/howto/deployment/checklist/


# Application definition
THIRD_PARTY_APPS = [
    "rest_framework",
    "corsheaders",
    "django_filters",
    "django_vite",
    "tinymce",
]

USER_DEFINED_APPS = [
    "app.apps.AppConfig",
]

BUILT_IN_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

INSTALLED_APPS = BUILT_IN_APPS + THIRD_PARTY_APPS + USER_DEFINED_APPS
INSTALLED_APPS.insert(0, "jazzmin")

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    # "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "app.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "app.wsgi.application"


# Password validation
# https://docs.djangoproject.com/en/6.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/6.1/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files and media files
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# REST Framework Settings
REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
    ),
    "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.openapi.AutoSchema",
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
}

# CORS Settings
CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

CORS_PREFLIGHT_MAX_AGE = 86400  # 24 hours
# Security Settings
SECURE_CONTENT_TYPE_NOSNIFF = True
# X_FRAME_OPTIONS = "DENY"  # Disabled to allow embedding in Zen/Lovable


# Vite Settings
DJANGO_VITE = {
    "default": {
        "manifest_path": BASE_DIR / "static" / "frontend" / "manifest.json",
        "static_url_prefix": "frontend",
    }
}

JAZZMIN_SETTINGS = {
    "site_title": "Udhamshi Nepal Admin",
    "site_header": "Udhamshi Nepal",
    "site_brand": "Udhamshi Nepal",
    "welcome_sign": "Welcome to the Udhamshi Nepal Admin",
    "show_sidebar": True,
    "navigation_expanded": True,
    "order_with_respect_to": [
        "website_content",
        "website_content.HeroSection",
        "website_content.Stats",
        "website_content.MarqueeService",
        "about_company",
        "about_company.Organization",
        "about_company.AboutUs",
        "about_company.Vision",
        "about_company.Mision",
        "about_company.Values",
        "about_company.WhatWeDo",
        "about_company.OurService",
        "about_company.Patner",
        "about_company.SisterCompanies",
        "careers",
        "products_catalog",
        "projects_events",
        "our_team",
        "testimonials",
        "contact_messages",
    ],
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
        "website_content.HeroSection": "fas fa-images",
        "website_content.Stats": "fas fa-chart-line",
        "website_content.MarqueeService": "fas fa-stream",
        "about_company.Organization": "fas fa-building",
        "about_company.AboutUs": "fas fa-info-circle",
        "about_company.Vision": "fas fa-eye",
        "about_company.Mision": "fas fa-bullseye",
        "about_company.Values": "fas fa-award",
        "about_company.WhatWeDo": "fas fa-handshake",
        "about_company.OurService": "fas fa-concierge-bell",
        "about_company.Patner": "fas fa-users",
        "about_company.SisterCompanies": "fas fa-layer-group",
        "careers.Career": "fas fa-briefcase",
        "products_catalog.Product": "fas fa-box",
        "projects_events.Project": "fas fa-lightbulb",
        "projects_events.Events": "fas fa-calendar-check",
        "our_team.Team": "fas fa-user-friends",
        "testimonials.Testimonial": "fas fa-comments",
        "contact_messages.Contact": "fas fa-envelope",
    },
    "default_icon_parents": "fas fa-chevron-circle-right",
    "default_icon_children": "fas fa-circle",
}
