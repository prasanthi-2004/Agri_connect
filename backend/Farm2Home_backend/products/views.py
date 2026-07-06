from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from users.models import UserProfile
from .models import Product
from .serializers import ProductSerializer


# ==========================================
# ALL PRODUCTS (SHOP PAGE)
# ==========================================
@api_view(["GET"])
def product_list(request):
    products = Product.objects.all().order_by("-created_at")
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# ==========================================
# FARMERS LIST
# ==========================================
@api_view(["GET"])
def farmer_list(request):
    farmers = UserProfile.objects.filter(role="farmer")

    data = []
    for farmer in farmers:
        data.append({
            "id": farmer.id,
            "username": farmer.user.username,
            "email": farmer.user.email,
            "phone": farmer.phone,
            "village": farmer.village,
            "city": farmer.city,
            "state": farmer.state,
            "address": farmer.address,
            "experience": farmer.experience,
            "photo": farmer.photo,
            "bio": farmer.bio,
        })

    return Response(data)


# ==========================================
# SINGLE FARMER
# ==========================================
@api_view(["GET"])
def farmer_detail(request, pk):
    farmer = get_object_or_404(UserProfile, id=pk, role="farmer")

    return Response({
        "id": farmer.id,
        "username": farmer.user.username,
        "email": farmer.user.email,
        "phone": farmer.phone,
        "village": farmer.village,
        "city": farmer.city,
        "state": farmer.state,
        "address": farmer.address,
        "experience": farmer.experience,
        "photo": farmer.photo,
        "bio": farmer.bio,
    })


# ==========================================
# FARMER PRODUCTS
# ==========================================
@api_view(["GET"])
def farmer_products(request, pk):
    products = Product.objects.filter(farmer_id=pk)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# ==========================================
# ADD PRODUCT
# ==========================================
@api_view(["POST"])
def add_product(request, pk):
    farmer = get_object_or_404(UserProfile, id=pk, role="farmer")

    product = Product.objects.create(
        farmer=farmer,
        name=request.data.get("name"),
        price=request.data.get("price"),
        quantity=request.data.get("quantity"),
        description=request.data.get("description"),
        category=request.data.get("category"),
        image=request.data.get("image"),
    )

    return Response(
        ProductSerializer(product).data,
        status=status.HTTP_201_CREATED
    )


# ==========================================
# UPDATE PRODUCT (FIXED)
# ==========================================
@api_view(["PUT"])
def update_product(request, pk):
    print("=" * 50)
    print("UPDATE VIEW CALLED")
    print("PK:", pk)

    product = Product.objects.filter(id=pk).first()
    print("PRODUCT:", product)

    if product is None:
        return Response({"error": "Product not found"}, status=404)

    serializer = ProductSerializer(product, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    print(serializer.errors)
    return Response(serializer.errors, status=400)


# ==========================================
# DELETE PRODUCT (FIXED)
# ==========================================
@api_view(["DELETE"])
def delete_product(request, pk):
    print("=" * 50)
    print("DELETE VIEW CALLED")
    print("PK:", pk)

    product = Product.objects.filter(id=pk).first()
    print("PRODUCT:", product)

    if product is None:
        return Response({"error": "Product not found"}, status=404)

    product.delete()

    return Response({"message": "Deleted successfully"})