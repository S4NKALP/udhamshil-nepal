from datetime import time

from django.core.management.base import BaseCommand
from django.db import transaction

from app.models import (
    AboutUs,
    Career,
    Contact,
    Events,
    HeroSection,
    MarqueeService,
    Mision,
    Organization,
    OurService,
    Patner,
    Product,
    ProductFeatures,
    Project,
    SisterCompanies,
    Stats,
    Team,
    Testimonial,
    Values,
    Vision,
    WhatWeDo,
)


class Command(BaseCommand):
    help = "Seed demo data for all models (all fields, including optional ones)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--flush",
            action="store_true",
            help="Delete existing data before seeding.",
        )

    def handle(self, *args, **options):
        if options["flush"]:
            self._flush()

        with transaction.atomic():
            created = self._seed()

        for label, count in created:
            self.stdout.write(self.style.SUCCESS(f"{label}: {count}"))

        self.stdout.write(self.style.SUCCESS("Demo seed complete."))

    def _flush(self):
        models = [
            ProductFeatures,
            Product,
            Project,
            Events,
            Career,
            Contact,
            Team,
            Testimonial,
            HeroSection,
            Stats,
            MarqueeService,
            AboutUs,
            Vision,
            Mision,
            Values,
            WhatWeDo,
            Patner,
            SisterCompanies,
            OurService,
            Organization,
        ]
        for model in models:
            model.objects.all().delete()
        self.stdout.write(self.style.WARNING("Existing data flushed."))

    def _seed(self):
        created = []

        # --- Organization (singleton) ---
        org, org_created = Organization.objects.get_or_create(
            pk=Organization.SINGLETON_PK,
            defaults={
                "name": "Udhamshil Nepal",
                "short_intro": "Empowering youth through skill development and employment opportunities in Nepal.",
                "logo": "institue/demo-logo.png",
                "address": "Kathmandu, Nepal",
                "phone_number": "9800000001",
                "telephone_number": "01-4000001",
                "primary_email": "info@udhamshilnepal.com",
                "secondary_email": "contact@udhamshilnepal.com",
                "whatsapp_no": "9800000002",
                "facebook": "https://facebook.com/udhamshilnepal",
                "tiktok": "https://tiktok.com/@udhamshilnepal",
                "instagram": "https://instagram.com/udhamshilnepal",
                "youtube": "https://youtube.com/@udhamshilnepal",
                "linkedin": "https://linkedin.com/company/udhamshilnepal",
                "working_hour": "Sunday – Friday, 10AM to 6PM",
                "google_map_link": "https://maps.google.com/?q=Kathmandu+Nepal",
            },
        )
        created.append(("Organization", 1 if org_created else 0))

        # --- Products + Features ---
        products = []
        for i in range(1, 4):
            product, _ = Product.objects.get_or_create(
                name=f"Demo Product {i}",
                defaults={"image": f"products/demo-product-{i}.png"},
            )
            products.append(product)
        created.append(("Product", len(products)))

        features = []
        for product in products:
            for j in range(1, 3):
                feature, _ = ProductFeatures.objects.get_or_create(
                    product=product,
                    name=f"Feature {j} of {product.name}",
                )
                features.append(feature)
        created.append(("ProductFeatures", len(features)))

        # --- Projects ---
        projects = []
        for i in range(1, 4):
            project, _ = Project.objects.get_or_create(
                name=f"Demo Project {i}",
                defaults={
                    "image": f"projects/demo-project-{i}.png",
                    "short_info": f"Short summary for demo project {i}.",
                    "details": f"<p>Detailed HTML description for demo project {i}.</p>",
                    "organization": "Udhamshil Nepal",
                },
            )
            projects.append(project)
        created.append(("Project", len(projects)))

        # --- Events ---
        events = []
        for i in range(1, 4):
            event, _ = Events.objects.get_or_create(
                name=f"Demo Event {i}",
                defaults={
                    "image": f"events/demo-event-{i}.png",
                    "short_info": f"Short summary for demo event {i}.",
                    "details": f"<p>Detailed HTML description for demo event {i}.</p>",
                    "organization": "Udhamshil Nepal",
                },
            )
            events.append(event)
        created.append(("Events", len(events)))

        # --- Careers ---
        careers = []
        for i in range(1, 4):
            career, _ = Career.objects.get_or_create(
                name=f"Demo Career {i}",
                defaults={
                    "short_info": f"Short info for demo career position {i}.",
                    "job_time": "Full Time" if i % 2 else "Part Time",
                    "location": "Kathmandu, Nepal",
                    "deadline": time(17, 0, 0),
                    "details": f"<p>Job details HTML for demo career {i}.</p>",
                },
            )
            careers.append(career)
        created.append(("Career", len(careers)))

        # --- Contacts ---
        contacts = []
        for i in range(1, 4):
            contact, _ = Contact.objects.get_or_create(
                name=f"Demo Contact {i}",
                subject=f"Demo Inquiry {i}",
                defaults={
                    "phone_no": f"98000000{i:02d}",
                    "email": f"demo{i}@example.com",
                    "message": f"This is demo contact message number {i}.",
                },
            )
            contacts.append(contact)
        created.append(("Contact", len(contacts)))

        # --- Team ---
        teams = []
        for i in range(1, 4):
            team, _ = Team.objects.get_or_create(
                name=f"Demo Member {i}",
                position=f"Demo Position {i}",
                defaults={
                    "image": f"team/demo-member-{i}.png",
                    "short_intro": f"Short intro for demo team member {i}.",
                    "bio": f"<p>Biography HTML for demo team member {i}.</p>",
                    "phone_no": f"98000001{i:02d}",
                    "email": f"member{i}@udhamshilnepal.com",
                },
            )
            teams.append(team)
        created.append(("Team", len(teams)))

        # --- Testimonials ---
        testimonials = []
        for i in range(1, 4):
            testimonial, _ = Testimonial.objects.get_or_create(
                name=f"Demo Testimonial {i}",
                defaults={
                    "image": f"testimonials/demo-testimonial-{i}.png",
                    "testimonial": f"This is demo testimonial text number {i}.",
                    "organization": f"Demo Organization {i}",
                },
            )
            testimonials.append(testimonial)
        created.append(("Testimonial", len(testimonials)))

        # --- HeroSection ---
        hero, hero_created = HeroSection.objects.get_or_create(
            title="Welcome to Udhamshil Nepal",
            defaults={
                "subtitle": "Building futures together",
                "hero_section": "<p>Demo hero section HTML content.</p>",
                "cover_image": "hero/demo-hero.png",
            },
        )
        created.append(("HeroSection", 1 if hero_created else 0))

        # --- Stats ---
        stats_data = [
            ("Projects Completed", 250),
            ("Youth Trained", 1200),
            ("Partner Organizations", 45),
        ]
        stats_count = 0
        for title, value in stats_data:
            _, s_created = Stats.objects.get_or_create(
                title=title, defaults={"stats": value}
            )
            stats_count += 1 if s_created else 0
        created.append(("Stats", stats_count))

        # --- MarqueeService ---
        marquee_titles = [
            "Skill Development",
            "Employment Support",
            "Youth Empowerment",
            "Community Building",
        ]
        marquee_count = 0
        for title in marquee_titles:
            _, m_created = MarqueeService.objects.get_or_create(title=title)
            marquee_count += 1 if m_created else 0
        created.append(("MarqueeService", marquee_count))

        # --- AboutUs ---
        about, about_created = AboutUs.objects.get_or_create(
            title="About Us",
            defaults={
                "subtitle": "Who we are",
                "about_us": "<p>Demo about us HTML content.</p>",
                "cover_image": "aboutus/demo-about.png",
            },
        )
        created.append(("AboutUs", 1 if about_created else 0))

        # --- Vision ---
        vision, vision_created = Vision.objects.get_or_create(
            title="Our Vision",
            defaults={
                "subtitle": "Where we are heading",
                "vision": "<p>Demo vision HTML content.</p>",
                "cover_image": "vision/demo-vision.png",
            },
        )
        created.append(("Vision", 1 if vision_created else 0))

        # --- Mision ---
        mision, mision_created = Mision.objects.get_or_create(
            title="Our Mision",
            defaults={
                "subtitle": "What we do daily",
                "mision": "<p>Demo mision HTML content.</p>",
                "cover_image": "mision/demo-mision.png",
            },
        )
        created.append(("Mision", 1 if mision_created else 0))

        # --- Values ---
        values, values_created = Values.objects.get_or_create(
            title="Our Values",
            defaults={
                "subtitle": "What we stand for",
                "values": "<p>Demo values HTML content.</p>",
                "cover_image": "values/demo-values.png",
            },
        )
        created.append(("Values", 1 if values_created else 0))

        # --- WhatWeDo ---
        whatwedo, whatwedo_created = WhatWeDo.objects.get_or_create(
            title="What We Do",
            defaults={
                "subtitle": "Our core activities",
                "what_we_do": "<p>Demo what we do HTML content.</p>",
                "cover_image": "whatwedo/demo-whatwedo.png",
            },
        )
        created.append(("WhatWeDo", 1 if whatwedo_created else 0))

        # --- Patner ---
        patners = []
        for i in range(1, 4):
            patner, _ = Patner.objects.get_or_create(
                name=f"Demo Partner {i}",
                defaults={"logo": f"patner/demo-partner-{i}.png"},
            )
            patners.append(patner)
        created.append(("Patner", len(patners)))

        # --- SisterCompanies ---
        sisters = []
        for i in range(1, 4):
            sister, _ = SisterCompanies.objects.get_or_create(
                name=f"Demo Sister Company {i}",
                defaults={
                    "logo": f"sistercompanies/demo-sister-{i}.png",
                    "website_link": f"https://demo-sister-{i}.com",
                },
            )
            sisters.append(sister)
        created.append(("SisterCompanies", len(sisters)))

        # --- OurService ---
        services = []
        for i in range(1, 4):
            service, _ = OurService.objects.get_or_create(
                name=f"Demo Service {i}",
                defaults={
                    "image": f"ourservice/demo-service-{i}.png",
                    "description": f"<p>Demo service description HTML for service {i}.</p>",
                },
            )
            services.append(service)
        created.append(("OurService", len(services)))

        return created
