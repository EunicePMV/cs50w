# Generated by Django 4.0.3 on 2022-03-31 03:30

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0022_createlisting_date_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='createlisting',
            name='date_time',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 3, 31, 3, 30, 4, 491213, tzinfo=utc), editable=False, null=True),
        ),
    ]
