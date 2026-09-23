from rest_framework.routers import SimpleRouter

from .views import (
    AboutUsViewSet,
    MisionViewSet,
    OrganizationView,
    OurServiceViewSet,
    PatnerViewSet,
    SisterCompaniesViewSet,
    ValuesViewSet,
    VisionViewSet,
    WhatWeDoViewSet,
)

router = SimpleRouter()
router.register("org/about", AboutUsViewSet, basename="about-us")
router.register("org/vision", VisionViewSet, basename="vision")
router.register("org/mision", MisionViewSet, basename="mision")
router.register("org/values", ValuesViewSet, basename="values")
router.register("org/what-we-do", WhatWeDoViewSet, basename="what-we-do")
router.register("org/partners", PatnerViewSet, basename="partner")
router.register("org/sister-companies", SisterCompaniesViewSet, basename="sister-company")
router.register("org/services", OurServiceViewSet, basename="our-service")
router.register("org/organization", OrganizationView, basename="organization")

urlpatterns = router.urls
