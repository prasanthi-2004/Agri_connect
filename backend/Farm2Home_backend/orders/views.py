from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone
from .models import Order
from .serializers import OrderSerializer


@api_view(['GET'])
def get_orders(request):    
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_customer_orders(request, customer_name):
    orders = Order.objects.filter(customer_name=customer_name).order_by("-ordered_at")
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_order(request):
    data = request.data

    order = Order(
        customer_name=data['customer_name'],
        product_name=data['product_name'],
        quantity=data['quantity'],
        total_price=data['total_price'],
        address=data['address'],
        ordered_at=timezone.now()   # ✅ FIX HERE
    )

    order.save()

    return Response(OrderSerializer(order).data)