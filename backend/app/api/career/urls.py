from rest_framework.routers import SimpleRouter

from .views import CareerViewSet, CareerApplicationViewSet

router = SimpleRouter()
router.register("career-applications", CareerApplicationViewSet, basename="career-application")
router.register("career", CareerViewSet, basename="career")

urlpatterns = router.urls
