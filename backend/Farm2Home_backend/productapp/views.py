from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404

from .models import Product
from .serializers import ProductSerializer


# =========================
# GET ALL PRODUCTS
# =========================
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# =========================
# ADD PRODUCT
# =========================
@api_view(['POST'])
def add_product(request):
    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Product Added Successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# UPDATE PRODUCT (FIXED)
# =========================
@api_view(['PUT'])
def update_product(request, pk):
    product = get_object_or_404(Product, id=pk)

    serializer = ProductSerializer(
        product,
        data=request.data,
        partial=True   # ⭐ IMPORTANT FIX (allows partial update)
    )

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Product Updated Successfully"},
            status=status.HTTP_200_OK
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# DELETE PRODUCT (FIXED)
# =========================
@api_view(['DELETE'])
def delete_product(request, pk):
    product = get_object_or_404(Product, id=pk)
    product.delete()

    return Response(
        {"message": "Product Deleted Successfully"},
        status=status.HTTP_200_OK
    )