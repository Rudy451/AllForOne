# Generated by Django 4.0.3 on 2022-03-23 23:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('play', '0037_alter_users_last_login_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='landmarks',
            name='question',
            field=models.CharField(default='', max_length=150),
        ),
        migrations.DeleteModel(
            name='Challenges',
        ),
    ]
