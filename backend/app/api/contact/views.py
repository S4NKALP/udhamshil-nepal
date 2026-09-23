from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser

from app.models import Contact

from .serializers import ContactSerializer


class ContactViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Contact.objects.order_by("-created_at")
    serializer_class = ContactSerializer

    def get_permissions(self):
        # Anyone may submit a message; reading contact PII (name, phone,
        # email, message) is restricted to admins.
        if self.action == "create":
            return [AllowAny()]
        return [IsAdminUser()]
