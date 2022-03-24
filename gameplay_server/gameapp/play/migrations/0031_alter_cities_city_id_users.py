# Generated by Django 4.0.3 on 2022-03-23 21:57

import datetime
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('play', '0030_alter_cities_city_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cities',
            name='city_id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('user_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('public_key_address', models.CharField(max_length=42, unique=True)),
                ('user_name', models.CharField(max_length=100, unique=True)),
                ('last_login_time', models.DateTimeField(default=datetime.datetime(2022, 3, 23, 14, 57, 16, 720307))),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='play.cities')),
            ],
        ),
    ]
