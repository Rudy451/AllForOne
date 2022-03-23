# Generated by Django 4.0.3 on 2022-03-23 14:25

import datetime
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('play', '0008_alter_challenges_challenge_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='challenges',
            name='solution',
        ),
        migrations.RemoveField(
            model_name='users',
            name='challenge_five',
        ),
        migrations.RemoveField(
            model_name='users',
            name='challenge_four',
        ),
        migrations.RemoveField(
            model_name='users',
            name='challenge_one',
        ),
        migrations.RemoveField(
            model_name='users',
            name='challenge_seven',
        ),
        migrations.RemoveField(
            model_name='users',
            name='challenge_six',
        ),
        migrations.RemoveField(
            model_name='users',
            name='challenge_three',
        ),
        migrations.RemoveField(
            model_name='users',
            name='challenge_two',
        ),
        migrations.AlterField(
            model_name='challenges',
            name='challenge_id',
            field=models.UUIDField(default=uuid.UUID('7755e501-4f83-4ef4-b919-e0ebf5cd3fd1'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='cities',
            name='city_id',
            field=models.UUIDField(default=uuid.UUID('48d3b8e4-651d-473d-a79d-0d255fc14c77'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='landmarks',
            name='landmark_id',
            field=models.UUIDField(default=uuid.UUID('5d2408d4-2de7-482c-a9ef-f65b1f1d68d0'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='users',
            name='last_login_time',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 23, 7, 25, 57, 70121)),
        ),
    ]
