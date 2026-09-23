import os
import shutil
from datetime import time
from django.conf import settings
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
    help = "Seed demo data using real frontend content and images."

    def add_arguments(self, parser):
        parser.add_argument("--flush", action="store_true", help="Delete existing data before seeding.")

    def _copy_image(self, src_filename, dest_subpath):
        """
        Copy an image from frontend/src/assets to media/dest_subpath.
        Returns the relative path for the ImageField, or None if not found.
        """
        src_path = os.path.join(settings.BASE_DIR, "..", "frontend", "src", "assets", src_filename)
        if not os.path.exists(src_path):
            return None
            
        dest_full_path = os.path.join(settings.MEDIA_ROOT, dest_subpath)
        os.makedirs(os.path.dirname(dest_full_path), exist_ok=True)
        shutil.copy2(src_path, dest_full_path)
        return dest_subpath

    def handle(self, *args, **options):
        if options["flush"]:
            self._flush()

        with transaction.atomic():
            created = self._seed()

        for label, count in created:
            self.stdout.write(self.style.SUCCESS(f"{label}: {count}"))

        self.stdout.write(self.style.SUCCESS("Real data seed complete."))

    def _flush(self):
        models = [ProductFeatures, Product, Project, Events, Career, Contact, Team, Testimonial, HeroSection, Stats, MarqueeService, AboutUs, Vision, Mision, Values, WhatWeDo, Patner, SisterCompanies, OurService, Organization]
        for model in models:
            model.objects.all().delete()
        self.stdout.write(self.style.WARNING("Existing data flushed."))

    def _seed(self):
        created = []

        # --- Organization ---
        org, _ = Organization.objects.get_or_create(
            pk=Organization.SINGLETON_PK,
            defaults={
                "name": "Udhamsil Nepal",
                "short_intro": "Prominent exporter, manufacturer, distributor and supplier of small scale, medium scale and commercial machinery in Nepal.",
                "address": "Kohalpur-11, Banke\nLumbini Province, Nepal",
                "phone_number": "9800000000",
                "telephone_number": "081-000000",
                "primary_email": "info@udhamsilnepal.com",
                "working_hour": "Sunday – Friday, 9:00 – 18:00",
            },
        )
        created.append(("Organization", 1))

        # --- Products + Features ---
        product_data = [
            ("Small Scale", "product-small.jpg", ["Mini milling machines", "Grain grinders", "Oil expellers", "Bench drills"]),
            ("Medium Scale", "product-medium.jpg", ["Food processing lines", "Dough & noodle plants", "Filling machines", "Dryers"]),
            ("Commercial", "product-commercial.jpg", ["Automated packaging lines", "Cold storage units", "Conveyor systems", "Boilers"]),
        ]
        
        p_count = 0
        pf_count = 0
        for name, img, feats in product_data:
            img_path = self._copy_image(img, f"products/{img}")
            prod, _ = Product.objects.get_or_create(name=name, defaults={"image": img_path})
            p_count += 1
            for f in feats:
                ProductFeatures.objects.get_or_create(product=prod, name=f)
                pf_count += 1
        created.append(("Product", p_count))
        created.append(("ProductFeatures", pf_count))

        # --- Projects ---
        proj, _ = Project.objects.get_or_create(
            name="Commercial food line, Banke",
            defaults={
                "image": self._copy_image("product-medium.jpg", "projects/commercial-food.jpg"),
                "short_info": "Supplied and commissioned a full processing line for a regional food producer.",
                "details": "<p>Supplied and commissioned a full processing line for a regional food producer. (2023)</p>",
                "organization": "Regional Food Producer",
            }
        )
        proj2, _ = Project.objects.get_or_create(
            name="Cooperative mill programme",
            defaults={
                "image": self._copy_image("workshop.jpg", "projects/coop-mill.jpg"),
                "short_info": "Distributed small-scale milling units to farming cooperatives across the Terai.",
                "details": "<p>Distributed small-scale milling units to farming cooperatives across the Terai. (2022)</p>",
                "organization": "Farming Cooperatives",
            }
        )
        created.append(("Project", 2))

        # --- Events ---
        evt, _ = Events.objects.get_or_create(
            name="National industry expo",
            defaults={
                "image": self._copy_image("product-commercial.jpg", "events/expo-2024.jpg"),
                "short_info": "Showcased our packaging and cold-storage range to buyers from across Nepal.",
                "details": "<p>Showcased our packaging and cold-storage range to buyers from across Nepal. (2024)</p>",
                "organization": "National Expo",
            }
        )
        created.append(("Events", 1))

        # --- Careers ---
        career_data = [
            (
                "Workshop Machinist", "Assembly, fitting and finishing of machinery units at our Kohalpur workshop.",
                "Full-time · Sun–Fri", "Kohalpur-11, Banke, Nepal", 
                "<h3>About</h3><p>You will work hands-on with small, medium and commercial machinery units — from receiving components to final quality checks before dispatch. Precision and care for finish matter more than speed.</p><h3>Responsibilities</h3><ul><li>Assemble and fit machinery components</li><li>Perform finishing, alignment and calibration</li><li>Run pre-dispatch quality and safety checks</li><li>Maintain workshop tools</li><li>Report material defects</li></ul>"
            ),
            (
                "Field Service Engineer", "Installation, commissioning and maintenance at customer sites across the country.",
                "Full-time · Field-based", "Customer sites across Nepal", 
                "<h3>About</h3><p>You will be the face of Udhamsil Nepal at customer sites — installing machines, training operators, and keeping equipment running. Expect regular travel and direct responsibility for customer satisfaction.</p><h3>Responsibilities</h3><ul><li>Install and commission machinery</li><li>Diagnose and repair mechanical and electrical faults</li><li>Train operators</li><li>Keep service records</li></ul>"
            ),
            (
                "Sales & Distribution Officer", "Dealer relationships, quotations and order follow-up across Lumbini Province.",
                "Full-time · Office + dealer visits", "Kohalpur, Banke", 
                "<h3>About</h3><p>You will grow our dealer and distribution network, prepare quotations, and make sure orders move smoothly from enquiry to delivery.</p><h3>Responsibilities</h3><ul><li>Manage dealer relationships</li><li>Prepare quotations and invoices</li><li>Follow up orders</li><li>Track territory sales</li></ul>"
            ),
        ]
        
        c_count = 0
        for name, info, jtime, loc, html in career_data:
            Career.objects.get_or_create(
                name=name,
                defaults={
                    "short_info": info,
                    "job_time": jtime,
                    "location": loc,
                    "deadline": time(17, 0, 0),
                    "details": html
                }
            )
            c_count += 1
        created.append(("Career", c_count))

        # --- Team ---
        team_data = [
            ("Managing Director", "Leads trade partnerships and company strategy."),
            ("Head of Engineering", "Oversees machine specification, testing and build quality."),
            ("Production Manager", "Runs the Kohalpur assembly floor and delivery schedule."),
            ("Import & Export Lead", "Handles sourcing, customs and cross-border logistics."),
            ("Service Engineer", "Field installation, commissioning and preventive maintenance."),
            ("Customer Support", "First point of contact for parts, training and warranty."),
        ]
        t_count = 0
        for role, copy in team_data:
            Team.objects.get_or_create(
                name=role,
                position=role,
                defaults={
                    "short_intro": copy,
                    "bio": f"<p>{copy}</p>"
                }
            )
            t_count += 1
        created.append(("Team", t_count))

        # --- Testimonials ---
        test_data = [
            ("Food processing operator", "Lumbini Province", "The team understood our production target, recommended the right capacity and stayed involved through installation."),
            ("Manufacturing business owner", "Karnali Province", "Clear advice and dependable after-sales support made upgrading our workshop far easier than expected."),
            ("Commercial project manager", "Sudurpashchim Province", "Our equipment arrived prepared for work, and the operators received practical guidance from day one."),
        ]
        test_count = 0
        for name, org_name, quote in test_data:
            Testimonial.objects.get_or_create(
                name=name,
                defaults={
                    "organization": org_name,
                    "testimonial": quote
                }
            )
            test_count += 1
        created.append(("Testimonial", test_count))

        # --- HeroSection ---
        HeroSection.objects.get_or_create(
            title="Machinery built for",
            defaults={
                "subtitle": "Est. 2020 · Kohalpur, Banke",
                "hero_section": "Nepal.", # We map this to highlight
                "cover_image": self._copy_image("hero-machinery.jpg", "hero/hero-machinery.jpg"),
            }
        )
        created.append(("HeroSection", 1))

        # --- Stats ---
        stats_data = [
            ("Machines supplied", 250),
            ("Districts served", 40),
            ("On-time delivery", 98),
        ]
        for label, val in stats_data:
            Stats.objects.get_or_create(title=label, defaults={"stats": val})
        created.append(("Stats", 3))

        # --- MarqueeService ---
        for m in ["Export", "Manufacture", "Distribute", "Supply", "Service"]:
            MarqueeService.objects.get_or_create(title=m)
        created.append(("MarqueeService", 5))

        # --- WhatWeDo ---
        wwd_data = [
            ("Small Scale", "Compact units for households and micro-enterprises — easy to install, simple to maintain.", "product-small.jpg"),
            ("Medium Scale", "Production lines for growing workshops, balancing output with reliable uptime.", "product-medium.jpg"),
            ("Commercial", "Heavy-duty industrial equipment engineered for continuous, high-volume operation.", "product-commercial.jpg"),
        ]
        for t, c, i in wwd_data:
            WhatWeDo.objects.get_or_create(
                title=t, 
                defaults={
                    "what_we_do": f"<p>{c}</p>",
                    "cover_image": self._copy_image(i, f"whatwedo/{i}")
                }
            )
        created.append(("WhatWeDo", 3))

        # --- Patner ---
        patners = ["Agro Processing", "Food Production", "Cold Storage", "Construction", "Energy & Utilities", "Local Enterprise"]
        for p in patners:
            Patner.objects.get_or_create(name=p)
        created.append(("Patner", 6))

        # --- SisterCompanies ---
        sisters = [
            ("Udhamsil Agro Systems", "Mechanisation and processing solutions for Nepal's growing agro-enterprises."),
            ("Udhamsil Energy Solutions", "Efficient power and utility systems for productive, resilient operations."),
            ("Udhamsil Industrial Services", "Installation, maintenance and technical support across the machinery lifecycle."),
        ]
        for name, copy in sisters:
            SisterCompanies.objects.get_or_create(name=name, defaults={"website_link": ""})
        created.append(("SisterCompanies", 3))

        # --- OurService ---
        services_data = [
            ("Understand", "We map your output, space, power and budget."),
            ("Specify", "We match the right machine and configuration."),
            ("Deliver", "We coordinate supply, setup and operator guidance."),
            ("Support", "We stay available for parts and maintenance."),
        ]
        for name, desc in services_data:
            OurService.objects.get_or_create(name=name, defaults={"description": f"<p>{desc}</p>"})
        created.append(("OurService", 4))
        
        # --- About Us (Story, Vision, Mission, Values) ---
        AboutUs.objects.get_or_create(
            title="Our story",
            defaults={
                "about_us": "<p>Established in 2020 and based in Kohalpur-11, Banke, we began by supplying compact machinery to local enterprises. Today we cover the full range — from small workshop units to full commercial production lines — for customers across the country.</p><p>Our mission is to provide reliable and innovative machinery solutions: equipment that arrives ready to work, backed by people who know how to keep it running.</p>",
                "cover_image": self._copy_image("workshop.jpg", "about/workshop.jpg")
            }
        )
        created.append(("AboutUs", 1))

        Vision.objects.get_or_create(
            title="Where we are heading",
            defaults={
                "subtitle": "From Kohalpur to every district, we aim to set the standard for what Nepali businesses can expect from their machinery supplier: dependable equipment, honest advice and service that shows up when it matters.",
                "vision": "<p>To be Nepal's most trusted machinery partner — the first name Nepali industry turns to for equipment that performs, season after season.</p>"
            }
        )
        created.append(("Vision", 1))

        Mision.objects.get_or_create(
            title="What drives us daily",
            defaults={
                "subtitle": "Every machine we export, manufacture, distribute or supply is chosen and prepared with the same goal: it arrives ready to work and stays working.",
                "mision": "<p>To provide reliable and innovative machinery solutions — small scale, medium scale and commercial — delivered ready to work and supported for life.</p>"
            }
        )
        created.append(("Mision", 1))

        values_data = [
            ("Reliability", "Machines chosen and built to run through long seasons with minimal downtime."),
            ("Innovation", "Continual upgrades to designs so Nepali industry keeps pace with the region."),
            ("Local service", "Parts, training and support delivered from Banke to every district we serve."),
            ("Fair trade", "Transparent pricing across export, manufacture, distribution and supply."),
        ]
        for v_t, v_c in values_data:
            Values.objects.get_or_create(title=v_t, defaults={"values": f"<p>{v_c}</p>"})
        created.append(("Values", 4))

        return created
