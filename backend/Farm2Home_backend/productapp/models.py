from django.db import models

class Product(models.Model):

    CATEGORY_CHOICES = (

        ('fruit', 'Fruit'),

        ('vegetable', 'Vegetable'),

        ('grain', 'Grain'),

        ('dairy', 'Dairy'),
    )

    name = models.CharField(max_length=200)

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )

    price = models.IntegerField()

    description = models.TextField()

    image = models.URLField()

    farmer_name = models.CharField(max_length=100)

    discount = models.FloatField(default=0)

    def __str__(self):

        return self.name