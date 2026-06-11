from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserProfile


@api_view(['POST'])
def register(request):

    username = request.data.get('username')

    email = request.data.get('email')

    password = request.data.get('password')

    role = request.data.get('role')

    if User.objects.filter(username=username).exists():

        return Response({
            "message": "Username already exists"
        })

    user = User.objects.create_user(

        username=username,
        email=email,
        password=password
    )

    UserProfile.objects.create(

        user=user,
        role=role
    )

    return Response({
        "message": "Registration Successful"
    })


@api_view(['POST'])
def login(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:

        profile = UserProfile.objects.get(user=user)

        return Response({

            "message": "Login Successful",
            "username": user.username,
            "role": profile.role
        })

    return Response({

        "message": "Invalid Credentials"
    })