# Generated by Django 4.0.3 on 2022-03-23 21:33

import datetime
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('play', '0020_remove_users_city_remove_users_last_login_time_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='city',
            field=models.ForeignKey(default=uuid.uuid4, on_delete=django.db.models.deletion.CASCADE, to='play.cities'),
        ),
        migrations.AddField(
            model_name='users',
            name='last_login_time',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 23, 14, 33, 23, 410071)),
        ),
        migrations.AddField(
            model_name='users',
            name='public_key_address',
            field=models.CharField(default=django.utils.timezone.now, max_length=42, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='users',
            name='user_name',
            field=models.CharField(default=django.utils.timezone.now, max_length=100, unique=True),
            preserve_default=False,
        ),
    ]
