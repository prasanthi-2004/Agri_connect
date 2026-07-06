from django.db import models
from users.models import UserProfile


class Product(models.Model):
    farmer = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="products",
        limit_choices_to={"role": "farmer"},
    )

    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    description = models.TextField(blank=True, null=True)

    image = models.TextField(blank=True, null=True)

    category = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.farmer.user.username}"