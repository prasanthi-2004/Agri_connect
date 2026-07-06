from django.urls import path
from . import views

urlpatterns = [
    path("products/", views.product_list),

    path("farmer/<int:pk>/products/", views.farmer_products),

    path("farmer/<int:pk>/add-product/", views.add_product),  # ✅ THIS MUST MATCH

    path("update-product/<int:pk>/", views.update_product),

    path("delete-product/<int:pk>/", views.delete_product),
]