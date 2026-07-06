from django.urls import path
from . import views
from .views import UserProfileListView

urlpatterns = [
    path("register/", views.register),
    path("login/", views.login),

    path("farmers/", views.farmers),
    path("farmer/<int:id>/", views.farmer_detail),

    path("profiles/", UserProfileListView.as_view(), name="profiles"),

    # one profile endpoint for GET + PUT
    path("profile/<int:pk>/", views.profile_detail),
]