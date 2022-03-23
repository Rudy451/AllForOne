from django.db import models
from datetime import datetime
import uuid

# Create your models here.
class Cities(models.Model):
  city_id=models.UUIDField(
    primary_key=True,
    default=uuid.uuid4(),
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
  average_game_completion_time = models.IntegerField(
    null=False,
    blank=False
  )

class Landmarks(models.Model):
  landmark_id = models.UUIDField(
    primary_key=True,
    default=uuid.uuid4(),
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
  average_challenge_completion_time = models.IntegerField(
    null=False,
    blank=False
  )
  city = models.ForeignKey(
    Cities,
    on_delete=models.CASCADE
  )

class Challenges(models.Model):
  challenge_id=models.UUIDField(
    primary_key=True,
    default = uuid.uuid4(),
    editable=False
  )
  type = models.CharField(
    max_length=7,
    null=False,
    blank=False
  )
  question = models.CharField(
    max_length=150,
    unique=True,
    null=False,
    blank=False
  )
  average_completion_time = models.IntegerField(
    null=False,
    blank=False
  )
  landmark = models.ForeignKey(
    Landmarks,
    on_delete=models.CASCADE
  )

class Users(models.Model):
  user_id = models.UUIDField(
    primary_key = True,
    default = uuid.uuid4(),
    editable = False
  ),
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
  last_login_time = models.DateTimeField(
    default=datetime.now(),
    null=False
  )
  city = models.ForeignKey(
    Cities,
    on_delete=models.CASCADE
  )
