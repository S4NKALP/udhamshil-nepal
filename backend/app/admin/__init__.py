from django.contrib import admin

from . import (  # noqa: F401
    career,
    company,
    contact,
    product,
    projects,
    team,
    testimonials,
    website,
)

original_get_app_list = admin.AdminSite.get_app_list


def custom_get_app_list(self, request, app_label=None):
    app_list = original_get_app_list(self, request, app_label)

    new_app_list = []
    for app in app_list:
        if app["app_label"] == "app":
            website_app = {
                "name": "Website Content",
                "app_label": "website_content",
                "app_url": app["app_url"],
                "has_module_perms": app["has_module_perms"],
                "models": [],
                "icon": "fas fa-globe",
            }
            about_app = {
                "name": "About & Company",
                "app_label": "about_company",
                "app_url": app["app_url"],
                "has_module_perms": app["has_module_perms"],
                "models": [],
                "icon": "fas fa-building",
            }
            careers_app = {
                "name": "Careers",
                "app_label": "careers",
                "app_url": app["app_url"],
                "has_module_perms": app["has_module_perms"],
                "models": [],
                "icon": "fas fa-briefcase",
            }
            products_app = {
                "name": "Products",
                "app_label": "products_catalog",
                "app_url": app["app_url"],
                "has_module_perms": app["has_module_perms"],
                "models": [],
                "icon": "fas fa-box",
            }
            projects_app = {
                "name": "Projects & Events",
                "app_label": "projects_events",
                "app_url": app["app_url"],
                "has_module_perms": app["has_module_perms"],
                "models": [],
                "icon": "fas fa-lightbulb",
            }
            team_app = {
                "name": "Our Team",
                "app_label": "our_team",
                "app_url": app["app_url"],
                "has_module_perms": app["has_module_perms"],
                "models": [],
                "icon": "fas fa-user-friends",
            }
            testimonials_app = {
                "name": "Testimonials",
                "app_label": "testimonials",
                "app_url": app["app_url"],
                "has_module_perms": app["has_module_perms"],
                "models": [],
                "icon": "fas fa-comments",
            }
            contact_app = {
                "name": "Contact Messages",
                "app_label": "contact_messages",
                "app_url": app["app_url"],
                "has_module_perms": app["has_module_perms"],
                "models": [],
                "icon": "fas fa-envelope",
            }

            for model in app["models"]:
                obj_name = model.get("object_name")
                if obj_name in [
                    "HeroSection",
                    "Stats",
                    "MarqueeService",
                ]:
                    website_app["models"].append(model)
                elif obj_name in [
                    "Organization",
                    "AboutUs",
                    "Vision",
                    "Mision",
                    "Values",
                    "WhatWeDo",
                    "OurService",
                    "Patner",
                    "SisterCompanies",
                ]:
                    about_app["models"].append(model)
                elif obj_name in ["Career"]:
                    careers_app["models"].append(model)
                elif obj_name in ["Product"]:
                    products_app["models"].append(model)
                elif obj_name in ["Project", "Events"]:
                    projects_app["models"].append(model)
                elif obj_name in ["Team"]:
                    team_app["models"].append(model)
                elif obj_name in ["Testimonial"]:
                    testimonials_app["models"].append(model)
                elif obj_name in ["Contact"]:
                    contact_app["models"].append(model)

            if website_app["models"]:
                website_order = [
                    "HeroSection",
                    "Stats",
                    "MarqueeService",
                ]
                website_app["models"].sort(
                    key=lambda x: (
                        website_order.index(x.get("object_name"))
                        if x.get("object_name") in website_order
                        else 99
                    )
                )
                new_app_list.append(website_app)
            if about_app["models"]:
                about_order = [
                    "Organization",
                    "AboutUs",
                    "Vision",
                    "Mision",
                    "Values",
                    "WhatWeDo",
                    "OurService",
                    "Patner",
                    "SisterCompanies",
                ]
                about_app["models"].sort(
                    key=lambda x: (
                        about_order.index(x.get("object_name"))
                        if x.get("object_name") in about_order
                        else 99
                    )
                )
                new_app_list.append(about_app)
            if careers_app["models"]:
                new_app_list.append(careers_app)
            if products_app["models"]:
                new_app_list.append(products_app)
            if projects_app["models"]:
                projects_order = [
                    "Project",
                    "Events",
                ]
                projects_app["models"].sort(
                    key=lambda x: (
                        projects_order.index(x.get("object_name"))
                        if x.get("object_name") in projects_order
                        else 99
                    )
                )
                new_app_list.append(projects_app)
            if team_app["models"]:
                new_app_list.append(team_app)
            if testimonials_app["models"]:
                new_app_list.append(testimonials_app)
            if contact_app["models"]:
                new_app_list.append(contact_app)
        else:
            new_app_list.append(app)

    return new_app_list


admin.AdminSite.get_app_list = custom_get_app_list
