# Generated by Django 4.0.3 on 2022-06-06 00:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('play', '0062_chattanoogalandmarktimerecords_remove_users_city_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='landmarks',
            name='average_challenge_completion_time',
        ),
    ]
