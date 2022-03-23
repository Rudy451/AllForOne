# Generated by Django 4.0.3 on 2022-03-23 04:01

import datetime
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('play', '0007_alter_challenges_challenge_id_alter_cities_city_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='challenges',
            name='challenge_id',
            field=models.UUIDField(default=uuid.UUID('2f1885fe-95b2-4994-b12f-1335378c142b'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='challenges',
            name='question',
            field=models.CharField(max_length=150, unique=True),
        ),
        migrations.AlterField(
            model_name='challenges',
            name='solution',
            field=models.CharField(max_length=150, unique=True),
        ),
        migrations.AlterField(
            model_name='cities',
            name='city_id',
            field=models.UUIDField(default=uuid.UUID('8ff47126-57bb-4571-9678-d5f84a06e003'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='landmarks',
            name='landmark_id',
            field=models.UUIDField(default=uuid.UUID('c05a35ba-8e67-425e-9af5-e92fc715a417'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='landmarks',
            name='landmark_name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='users',
            name='last_login_time',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 22, 21, 1, 7, 112565)),
        ),
    ]
