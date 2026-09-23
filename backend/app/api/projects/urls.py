from rest_framework.routers import SimpleRouter

from .views import EventsViewSet, ProjectViewSet

router = SimpleRouter()
router.register("projects", ProjectViewSet, basename="project")
router.register("events", EventsViewSet, basename="event")

urlpatterns = router.urls
