from django.shortcuts import render
from app.models import Organization, HeroSection

def index(request):
    org = Organization.objects.first()
    hero = HeroSection.objects.first()
    
    seo = {
        "title": "Udhamshil Nepal | Machinery built for Nepal",
        "description": "Reliable, innovative machinery solutions — exporting, manufacturing, distributing and supplying small, medium and commercial scale equipment across the nation.",
    }
    
    if org:
        seo["title"] = f"{org.name} | Machinery built for Nepal"
        seo["description"] = org.short_intro or seo["description"]
    
    if hero and hero.cover_image:
        seo["image"] = request.build_absolute_uri(hero.cover_image.url)

    context = {
        "seo": seo,
    }
    return render(request, "index.html", context)
