from rest_framework.routers import SimpleRouter

from .views import CareerViewSet

router = SimpleRouter()
router.register("career", CareerViewSet, basename="career")

urlpatterns = router.urls
