from django.urls import path
from .views import *


urlpatterns = [

    path(
        'products/',
        get_products
    ),

    path(
        'add-product/',
        add_product
    ),

    path(
        'update-product/<int:pk>/',
        update_product
    ),

    path(
        'delete-product/<int:pk>/',
        delete_product
    ),
]