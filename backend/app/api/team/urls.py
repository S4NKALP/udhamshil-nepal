from rest_framework.routers import SimpleRouter

from .views import TeamViewSet

router = SimpleRouter()
router.register("team", TeamViewSet, basename="team")

urlpatterns = router.urls
