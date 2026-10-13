from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create a superuser with pre-defined credentials"

    def handle(self, *args, **options):
        User = get_user_model()
        username = "udhamsilnepal@admin"
        password = "this_is_pass@udhamsilnepal"
        email = "info@udhamsilnepal.com.np"

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(
                username=username, email=email, password=password
            )
            self.stdout.write(
                self.style.SUCCESS(f"Successfully created superuser: {username}")
            )
        else:
            user = User.objects.get(username=username)
            user.set_password(password)
            user.is_superuser = True
            user.is_staff = True
            user.save()
            self.stdout.write(
                self.style.SUCCESS(f"Updated existing superuser: {username}")
            )
