# Generated by Django 4.0.3 on 2022-03-31 03:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0023_alter_createlisting_date_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='createlisting',
            name='date_time',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]