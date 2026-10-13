import os

from whitenoise.storage import CompressedManifestStaticFilesStorage


class ManifestStaticFilesStorage(CompressedManifestStaticFilesStorage):
    """WhiteNoise manifest storage that tolerates references to static directories.

    django-jazzmin renders ``{% static 'vendor/bootswatch' %}`` (a directory) for
    its client-side theme base path. Directories have no manifest entry, so the
    stock ``ManifestStaticFilesStorage`` raises ``ValueError`` and every admin
    page 500s after login. Genuinely missing *files* still raise as usual.
    """

    def stored_name(self, name):
        try:
            return super().stored_name(name)
        except ValueError:
            _, extension = os.path.splitext(name)
            if not extension:
                return name
            raise
