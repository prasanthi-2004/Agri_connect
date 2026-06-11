from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer


# GET PRODUCTS

@api_view(['GET'])
def get_products(request):

    products = Product.objects.all()

    serializer = ProductSerializer(

        products,
        many=True
    )

    return Response(serializer.data)


# ADD PRODUCT

@api_view(['POST'])
def add_product(request):

    serializer = ProductSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({

            "message": "Product Added Successfully"
        })

    return Response(serializer.errors)


# UPDATE PRODUCT

@api_view(['PUT'])
def update_product(request, pk):

    product = Product.objects.get(id=pk)

    serializer = ProductSerializer(

        product,
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({

            "message": "Product Updated Successfully"
        })

    return Response(serializer.errors)


# DELETE PRODUCT

@api_view(['DELETE'])
def delete_product(request, pk):

    product = Product.objects.get(id=pk)

    product.delete()

    return Response({

        "message": "Product Deleted Successfully"
    })