from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    farmer_name = serializers.CharField(
        source="farmer.user.username",
        read_only=True
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "farmer",
            "farmer_name",
            "name",
            "price",
            "quantity",
            "description",
            "category",
            "image",
            "created_at",
        ]