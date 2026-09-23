from rest_framework.routers import SimpleRouter

from .views import ContactViewSet

router = SimpleRouter()
router.register("contact", ContactViewSet, basename="contact")

urlpatterns = router.urls
