# Generated by Django 4.1 on 2022-09-07 08:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0009_post_likes'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='likes',
            new_name='likers',
        ),
    ]
