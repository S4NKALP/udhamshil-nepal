from rest_framework import serializers

from app.models import (
    AboutUs,
    Mision,
    Organization,
    OurService,
    Patner,
    SisterCompanies,
    Values,
    Vision,
    WhatWeDo,
)


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class VisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vision
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class MisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mision
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class ValuesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Values
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class WhatWeDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatWeDo
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class PatnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patner
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class SisterCompaniesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SisterCompanies
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class OurServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = OurService
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")
