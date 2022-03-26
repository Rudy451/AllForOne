# Generated by Django 4.0.3 on 2022-03-26 03:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('play', '0050_alter_cities_average_game_completion_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cities',
            name='total_game_completion_time',
        ),
        migrations.RemoveField(
            model_name='cities',
            name='total_game_completions',
        ),
        migrations.RemoveField(
            model_name='landmarks',
            name='total_challenge_completion_time',
        ),
        migrations.RemoveField(
            model_name='landmarks',
            name='total_challenge_completions',
        ),
        migrations.CreateModel(
            name='TimeRecords',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completion_time', models.DecimalField(decimal_places=14, default=0.0, max_digits=24)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='play.cities')),
                ('landmark', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='play.landmarks')),
            ],
        ),
    ]
