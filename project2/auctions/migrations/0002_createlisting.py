# Generated by Django 4.0.3 on 2022-03-28 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0001_initial'),
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
            ],
        ),
    ]
