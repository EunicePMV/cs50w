# Generated by Django 4.1 on 2022-09-04 09:00

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0008_alter_user_follows'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='liked_post', to=settings.AUTH_USER_MODEL),
        ),
    ]