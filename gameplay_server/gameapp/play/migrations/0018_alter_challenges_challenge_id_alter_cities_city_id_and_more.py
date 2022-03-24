# Generated by Django 4.0.3 on 2022-03-23 21:26

import datetime
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('play', '0017_alter_challenges_challenge_id_alter_cities_city_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='challenges',
            name='challenge_id',
            field=models.UUIDField(default=uuid.UUID('0bcdbcd3-6067-4c61-a5e2-fab7b5d0c5a0'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='cities',
            name='city_id',
            field=models.UUIDField(default=uuid.UUID('9f4b58da-2613-4766-94ff-8d5a34707198'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='landmarks',
            name='landmark_id',
            field=models.UUIDField(default=uuid.UUID('5d8ffa91-e4f3-4e87-b3d9-0aa45d151aae'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='users',
            name='last_login_time',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 23, 14, 25, 59, 881868)),
        ),
    ]
