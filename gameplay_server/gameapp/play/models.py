from django.utils import timezone
from django.db import models
import uuid

# Create your models here.
class Cities(models.Model):
  city_id = models.UUIDField(
    primary_key=True,
    default = uuid.uuid4,
    editable=False
  )
  city_name = models.CharField(
    max_length=100,
    null=False,
    blank=False
  )
  longitude = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    editable=False,
    null=False,
    blank=False
  )
  latitude = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    editable=False,
    null=False,
    blank=False
  )
  allowable_distance_difference = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    default=0.0006,
    null=False,
    blank=False
  )
  total_game_completion_time = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    default=0.0,
    null=False,
    blank=False
  )
  total_game_completions = models.IntegerField(
    default=1,
    null=False,
    blank=False
  )
  average_game_completion_time = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    default=0.0,
    null=False,
    blank=False
  )

class Landmarks(models.Model):
  landmark_id = models.UUIDField(
    primary_key=True,
    default = uuid.uuid4,
    editable=False
  )
  landmark_name = models.CharField(
    max_length=100,
    unique=True,
    null=False,
    blank=False
  )
  longitude = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    editable=False,
    null=False,
    blank=False
  )
  latitude = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    editable=False,
    null=False,
    blank=False
  )
  question = models.CharField(
    max_length=200,
    unique=True,
    editable=False,
    null=False,
    blank=False
  )
  total_challenge_completion_time = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    default=0.0,
    null=False,
    blank=False
  )
  total_challenge_completions = models.IntegerField(
    default=0,
    null=False,
    blank=False
  )
  average_challenge_completion_time = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    default=0.0,
    null=False,
    blank=False
  )
  city = models.ForeignKey(
    Cities,
    on_delete=models.CASCADE
  )

class Users(models.Model):
  user_id=models.UUIDField(
    primary_key=True,
    default = uuid.uuid4,
    editable=False
  )
  public_key_address = models.CharField(
    max_length=42,
    unique=True,
    null=False,
    blank=False
  )
  user_name = models.CharField(
    max_length=100,
    unique=True,
    null=False,
    blank=False
  )
  completed_challenge_count = models.IntegerField(
    default=0,
    null=False,
    blank=False
  )
  active_game_time = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    default=0.0,
    null=False,
    blank=False
  )
  last_login_time = models.DateTimeField(
    default=timezone.now
  )
  city = models.ForeignKey(
    Cities,
    on_delete=models.CASCADE
  )
  landmark_one = models.ForeignKey(
    Landmarks,
    related_name='challenge_one',
    default='03ee9967-9056-4cc1-9954-ff10f9d19973',
    on_delete=models.CASCADE
  )
  landmark_two = models.ForeignKey(
    Landmarks,
    related_name='challenge_two',
    default='03ee9967-9056-4cc1-9954-ff10f9d19973',
    on_delete=models.CASCADE
  )
  landmark_three = models.ForeignKey(
    Landmarks,
    related_name='challenge_three',
    default='03ee9967-9056-4cc1-9954-ff10f9d19973',
    on_delete=models.CASCADE
  )
  landmark_four = models.ForeignKey(
    Landmarks,
    related_name='challenge_four',
    default='03ee9967-9056-4cc1-9954-ff10f9d19973',
    on_delete=models.CASCADE
  )
  landmark_five = models.ForeignKey(
    Landmarks,
    related_name='challenge_five',
    default='03ee9967-9056-4cc1-9954-ff10f9d19973',
    on_delete=models.CASCADE
  )
  landmark_six = models.ForeignKey(
    Landmarks,
    related_name='challenge_six',
    default='03ee9967-9056-4cc1-9954-ff10f9d19973',
    on_delete=models.CASCADE
  )
  landmark_seven = models.ForeignKey(
    Landmarks,
    related_name='challenge_seven',
    default='03ee9967-9056-4cc1-9954-ff10f9d19973',
    on_delete=models.CASCADE
  )
