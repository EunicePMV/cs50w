from django.contrib import admin

from .models import User, CreateListing, Bid, Comment

# Register your models here.
admin.site.register(User)
admin.site.register(CreateListing)
admin.site.register(Bid)
admin.site.register(Comment)
