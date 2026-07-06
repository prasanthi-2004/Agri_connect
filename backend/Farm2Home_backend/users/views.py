from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics

from .models import UserProfile
from .serializers import UserProfileSerializer


# -----------------------------
# LIST ALL USER PROFILES
# -----------------------------
class UserProfileListView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


# -----------------------------
# REGISTER USER
# -----------------------------
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    role = request.data.get('role')

    if not username or not password:
        return Response({"message": "Username and password required"}, status=400)

    username = username.strip()

    if User.objects.filter(username=username).exists():
        return Response({"message": "Username already exists"}, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    UserProfile.objects.create(
        user=user,
        role=role
    )

    return Response({"message": "Registration Successful"})


# -----------------------------
# LOGIN USER
# -----------------------------
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"message": "Username and password required"}, status=400)

    username = username.strip()
    password = password.strip()

    try:
        user = User.objects.get(username=username)

        if not user.check_password(password):
            return Response({"message": "Invalid Credentials"}, status=401)

        profile = UserProfile.objects.get(user=user)

        return Response({
            "message": "Login Successful",

            # ✅ IMPORTANT FIXES
            "user_id": user.id,        # Django auth user id
            "profile_id": profile.id,  # ⭐ THIS IS WHAT YOU NEED

            "username": user.username,
            "email": user.email,
            "role": profile.role,
            "phone": profile.phone,
            "village": profile.village,
            "city": profile.city,
            "state": profile.state,
            "pincode": profile.pincode,
            "address": profile.address,
            "experience": profile.experience,
            "photo": profile.photo,
            "bio": profile.bio,
        })

    except User.DoesNotExist:
        return Response({"message": "Invalid Credentials"}, status=401)

    except UserProfile.DoesNotExist:
        return Response({"message": "Profile not found"}, status=404)

# -----------------------------
# GET ALL FARMERS
# -----------------------------
@api_view(['GET'])
def farmers(request):

    username = request.GET.get("username")

    if not username:
        return Response({"message": "Unauthorized"}, status=401)

    try:
        user = User.objects.get(username=username)
        profile = UserProfile.objects.get(user=user)

        if profile.role != "customer":
            return Response({"message": "Access denied"}, status=403)

        farmers = UserProfile.objects.filter(role="farmer")

        data = []
        for farmer in farmers:
            data.append({
                "id": farmer.id,
                "username": farmer.user.username,
                "email": farmer.user.email,
                "photo": farmer.photo,
                "phone": farmer.phone,
                "village": farmer.village,
                "state": farmer.state,
                "experience": farmer.experience,
                "bio": farmer.bio,
            })

        return Response(data)

    except User.DoesNotExist:
        return Response({"message": "Invalid user"}, status=401)

    except UserProfile.DoesNotExist:
        return Response({"message": "Profile not found"}, status=404)


# -----------------------------
# GET SINGLE FARMER
# -----------------------------
@api_view(['GET'])
def farmer_detail(request, id):
    try:
        farmer = UserProfile.objects.get(id=id, role="farmer")

        return Response({
            "id": farmer.id,
            "username": farmer.user.username,
            "email": farmer.user.email,
            "photo": farmer.photo,
            "phone": farmer.phone,
            "village": farmer.village,
            "state": farmer.state,
            "experience": farmer.experience,
            "bio": farmer.bio,
        })

    except UserProfile.DoesNotExist:
        return Response({"message": "Farmer not found"}, status=404)
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserProfile

@api_view(["GET", "PUT"])
def profile_detail(request, pk):
    try:
        profile = UserProfile.objects.get(pk=pk)
    except UserProfile.DoesNotExist:
        return Response({"message": "Profile not found"}, status=404)

    if request.method == "GET":
        return Response({
            "id": profile.id,
            "user_id": profile.user.id,
            "username": profile.user.username,
            "email": profile.user.email,
            "role": profile.role,
            "phone": profile.phone,
            "village": profile.village,
            "city": profile.city,
            "state": profile.state,
            "pincode": profile.pincode,
            "address": profile.address,
            "experience": profile.experience,
            "photo": profile.photo,
            "bio": profile.bio,
        })

    if request.method == "PUT":
        profile.phone = request.data.get("phone", profile.phone)
        profile.village = request.data.get("village", profile.village)
        profile.city = request.data.get("city", profile.city)
        profile.state = request.data.get("state", profile.state)
        profile.pincode = request.data.get("pincode", profile.pincode)
        profile.address = request.data.get("address", profile.address)
        profile.photo = request.data.get("photo", profile.photo)
        profile.bio = request.data.get("bio", profile.bio)

        profile.user.username = request.data.get("username", profile.user.username)
        profile.user.email = request.data.get("email", profile.user.email)

        profile.user.save()
        profile.save()

        return Response({
            "message": "Profile Updated Successfully",
            "id": profile.id,
            "user_id": profile.user.id,
            "username": profile.user.username,
            "email": profile.user.email,
            "role": profile.role,
            "phone": profile.phone,
            "village": profile.village,
            "city": profile.city,
            "state": profile.state,
            "pincode": profile.pincode,
            "address": profile.address,
            "experience": profile.experience,
            "photo": profile.photo,
            "bio": profile.bio,
        })