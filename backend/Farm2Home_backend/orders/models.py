from django.db import models

# Create your models here.



class Order(models.Model):

    customer_name = models.CharField(max_length=100)

    product_name = models.CharField(max_length=200)

    quantity = models.IntegerField()

    total_price = models.IntegerField()

    address = models.TextField()

    ordered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):

        return self.customer_name