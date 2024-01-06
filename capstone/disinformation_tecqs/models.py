from django.db import models


class User(models.Model):
    username = models.CharField(max_length=64) 

    def __str__(self):
        return f"{self.username}"