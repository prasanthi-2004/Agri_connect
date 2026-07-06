from django.db import models

class Order(models.Model):
    customer_name = models.CharField(max_length=100)
    product_name = models.CharField(max_length=200)
    quantity = models.IntegerField()
    total_price = models.IntegerField()
    address = models.TextField()

    # IMPORTANT: let Django handle time automatically
    ordered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer_name