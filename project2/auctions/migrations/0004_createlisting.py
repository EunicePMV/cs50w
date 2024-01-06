# Generated by Django 4.0.3 on 2022-03-29 07:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0003_delete_createlisting'),
    ]

    operations = [
        migrations.CreateModel(
            name='CreateListing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64)),
                ('description', models.TextField()),
                ('starting_bid', models.FloatField()),
                ('image_url', models.URLField(blank=True)),
                ('category', models.CharField(blank=True, choices=[('FASHION', 'Fashion'), ('TOYS', 'Toys'), ('HOME', 'Home'), ('ELECTRONICS', 'Electronics')], max_length=20)),
                ('bid_creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
