from operator import mod
from django.contrib.auth.models import AbstractUser
from django.db import models

# post, likes, followers


class User(AbstractUser):
    follows = models.ManyToManyField('self', related_name='followers', symmetrical=False)

    def serialize(self):
        return {
            "user_id": self.id,
            "username": self.username,
            "email": self.email,
            "following": [user.username for user in self.follows.all()],
            "followers": [user.username for user in self.followers.all()]
        }


class Post(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='post')
    post = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    likers = models.ManyToManyField(User, blank=True, related_name="liked_post")

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "post": self.post,
            "date": self.date.strftime("%b %d %Y, %I:%M %p"),
            "likers": [likers.username for likers in self.likers.all()]
        }
