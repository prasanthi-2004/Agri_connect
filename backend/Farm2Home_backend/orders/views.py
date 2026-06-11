from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Order
from .serializers import OrderSerializer


@api_view(['POST'])
def place_order(request):

    print(request.data)

    serializer = OrderSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({

            "message": "Order Placed Successfully"
        })

    print(serializer.errors)

    return Response(serializer.errors)