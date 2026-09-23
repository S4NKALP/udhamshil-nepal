"""generated with djinit"""

from .base import *  # noqa: F401, F403

DEBUG = False
SECRET_KEY = env('SECRET_KEY')
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=[])

# Database
# Using individual database parameters
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'PORT': env('DB_PORT', default='3306'),
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
    }
}

# CORS settings for production
# Filter out empty strings from FRONTEND_URL
CORS_ALLOWED_ORIGINS = env.list('FRONTEND_URL', default=[])
CORS_ALLOW_CREDENTIALS = True

# Additional CORS security for production
CORS_ALLOW_PRIVATE_NETWORK = False

# Email settings
MAILERS = {
    'default': {
        'BACKEND': 'django.core.mail.backends.smtp.EmailBackend',
        'OPTIONS': {
            'host': env('EMAIL_HOST', default='smtp.gmail.com'),
            'port': env.int('EMAIL_PORT', default=587),
            'use_tls': env.bool('EMAIL_USE_TLS', default=True),
            'username': env('EMAIL_HOST_USER', default=''),
            'password': env('EMAIL_HOST_PASSWORD', default=''),
        },
    },
}
DEFAULT_FROM_EMAIL = env('EMAIL_HOST_USER', default='')
SERVER_EMAIL = env('EMAIL_HOST_USER', default='')

# Security settings for production
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Session settings
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True


# Vite Settings
DJANGO_VITE["default"]["dev_mode"] = False
