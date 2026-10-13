"""generated with djinit"""

from .base import *  # noqa: F401, F403

DEBUG = False
SECRET_KEY = env("SECRET_KEY")
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])

# Database
# Using individual database parameters
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'PORT': env('DB_PORT', default='3306'),
#         'NAME': env('DB_NAME'),
#         'USER': env('DB_USER'),
#         'PASSWORD': env('DB_PASSWORD'),
#         'HOST': env('DB_HOST'),
#     }
# }

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
        "OPTIONS": {
            "transaction_mode": "IMMEDIATE",
            "timeout": 5,  # seconds
            "init_command": """
                PRAGMA journal_mode=WAL;
                PRAGMA synchronous=NORMAL;
                PRAGMA mmap_size = 134217728;
                PRAGMA journal_size_limit = 27103364;
                PRAGMA cache_size=2000;
            """,
        },
    }
}

# CORS settings for production
# Filter out empty strings from FRONTEND_URL
CORS_ALLOWED_ORIGINS = env.list("FRONTEND_URL", default=[])
CORS_ALLOW_CREDENTIALS = True

# Additional CORS security for production
CORS_ALLOW_PRIVATE_NETWORK = False

# Email settings
# Empty environment values (e.g. `EMAIL_PORT=` in .env) must fall back to the
# defaults instead of crashing `env.int`/`env.bool` at settings import time.
email_host = env("EMAIL_HOST", default="") or "smtp.gmail.com"
email_port = int(env("EMAIL_PORT", default="") or 587)
email_use_tls = env.bool("EMAIL_USE_TLS") if env("EMAIL_USE_TLS", default="") else True

MAILERS = {
    "default": {
        "BACKEND": "django.core.mail.backends.smtp.EmailBackend",
        "OPTIONS": {
            "host": email_host,
            "port": email_port,
            "use_tls": email_use_tls,
            "username": env("EMAIL_HOST_USER", default=""),
            "password": env("EMAIL_HOST_PASSWORD", default=""),
        },
    },
}
DEFAULT_FROM_EMAIL = env("EMAIL_HOST_USER", default="")
SERVER_EMAIL = env("EMAIL_HOST_USER", default="")

# Security settings for production
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Session settings
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True


# Vite Settings
DJANGO_VITE["default"]["dev_mode"] = False
