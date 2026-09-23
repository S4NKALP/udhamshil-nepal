from rest_framework import viewsets
from rest_framework.response import Response

from app.models import (
    AboutUs,
    Mision,
    Organization,
    OurService,
    Patner,
    SisterCompanies,
    Values,
    Vision,
    WhatWeDo,
)

from .serializers import (
    AboutUsSerializer,
    MisionSerializer,
    OrganizationSerializer,
    OurServiceSerializer,
    PatnerSerializer,
    SisterCompaniesSerializer,
    ValuesSerializer,
    VisionSerializer,
    WhatWeDoSerializer,
)


class AboutUsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutUs.objects.order_by("-created_at")
    serializer_class = AboutUsSerializer


class VisionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Vision.objects.order_by("-created_at")
    serializer_class = VisionSerializer


class MisionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Mision.objects.order_by("-created_at")
    serializer_class = MisionSerializer


class ValuesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Values.objects.order_by("-created_at")
    serializer_class = ValuesSerializer


class WhatWeDoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WhatWeDo.objects.order_by("-created_at")
    serializer_class = WhatWeDoSerializer


class PatnerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Patner.objects.order_by("-created_at")
    serializer_class = PatnerSerializer


class SisterCompaniesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SisterCompanies.objects.order_by("-created_at")
    serializer_class = SisterCompaniesSerializer


class OurServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OurService.objects.order_by("-created_at")
    serializer_class = OurServiceSerializer


class OrganizationView(viewsets.ViewSet):
    def list(self, request):
        instance = Organization.objects.first()
        if instance is None:
            return Response({"detail": "Organization not configured yet."}, status=404)
        serializer = OrganizationSerializer(instance, context={"request": request})
        return Response(serializer.data)
