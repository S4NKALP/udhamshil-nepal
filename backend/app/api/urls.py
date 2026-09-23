from django.urls import include, path

urlpatterns = [
    path("", include("app.api.career.urls")),
    path("", include("app.api.contact.urls")),
    path("", include("app.api.homepage.urls")),
    path("", include("app.api.org.urls")),
    path("", include("app.api.products.urls")),
    path("", include("app.api.projects.urls")),
    path("", include("app.api.team.urls")),
    path("", include("app.api.testimonials.urls")),
]
