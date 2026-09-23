from rest_framework.routers import SimpleRouter

from .views import HeroSectionViewSet, MarqueeServiceViewSet, StatsViewSet

router = SimpleRouter()
router.register("homepage/hero", HeroSectionViewSet, basename="hero-section")
router.register("homepage/stats", StatsViewSet, basename="stats")
router.register("homepage/marquee", MarqueeServiceViewSet, basename="marquee-service")

urlpatterns = router.urls
