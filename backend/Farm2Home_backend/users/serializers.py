from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", required=False)
    email = serializers.EmailField(source="user.email", required=False)

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "username",
            "email",
            "role",
            "phone",
            "village",
            "city",
            "state",
            "pincode",
            "address",
            "experience",
            "photo",
            "bio",
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})

        user = instance.user
        user.username = user_data.get("username", user.username)
        user.email = user_data.get("email", user.email)
        user.save()

        instance.phone = validated_data.get("phone", instance.phone)
        instance.village = validated_data.get("village", instance.village)
        instance.city = validated_data.get("city", instance.city)
        instance.state = validated_data.get("state", instance.state)
        instance.pincode = validated_data.get("pincode", instance.pincode)
        instance.address = validated_data.get("address", instance.address)
        instance.photo = validated_data.get("photo", instance.photo)
        instance.bio = validated_data.get("bio", instance.bio)
        instance.experience = validated_data.get(
            "experience",
            instance.experience
        )

        instance.save()
        return instance