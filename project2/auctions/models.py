from django.contrib.auth.models import AbstractUser
from django.db import models

from django.utils import timezone

class User(AbstractUser):
    pass

class CreateListing(models.Model):
    CATEGORY = [
        ('FASHION', 'Fashion'),
        ('TOYS', 'Toys'),
        ('HOME', 'Home'),
        ('ELECTRONICS', 'Electronics')
    ]

    bid_creator = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    description = models.TextField()
    starting_bid = models.FloatField()
    image_url = models.URLField(blank=True)

    category = models.CharField(max_length=20, choices=CATEGORY, blank=True)

    watchlist_user = models.ManyToManyField(User, blank=True, related_name='item')

    inactive = models.BooleanField(default=False)

    winner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='winner', null=True, blank=True)

    date_time = models.DateTimeField(auto_now_add=True, blank=True, editable=False, null=True)

    def __str__(self):
        return f"{self.title}"

class Bid(models.Model):
    item = models.ForeignKey(CreateListing, on_delete=models.CASCADE, related_name='bids')
    bidder = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    bid = models.FloatField()

    def __str__(self):
        return f"{self.bidder} - {self.item}"

class Comment(models.Model):
    comment = models.TextField()
    commenter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comment')
    item = models.ForeignKey(CreateListing, on_delete=models.CASCADE, related_name='commented_item')

    def __str__(self):
        return f"{self.commenter} commented in {self.item}"