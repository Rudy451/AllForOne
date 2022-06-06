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
  hint = models.CharField(
    max_length=200,
    default='',
    editable=False,
    null=False,
    blank=False
  )
  city = models.ForeignKey(
    Cities,
    blank=True,
    null=True,
    on_delete=models.CASCADE
  )

class ChattanoogaLandmarkTimeRecords(models.Model):
  time_record_id=models.UUIDField(
    primary_key=True,
    default = uuid.uuid4,
    editable=False
  )
  starting_landmark = models.ForeignKey(
    Landmarks,
    related_name='landmark_one',
    on_delete=models.CASCADE
  )
  ice_cream_show = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    default=0.0,
    null=False,
    blank=False
  )
  old_building_collapse = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    default=0.0,
    null=False,
    blank=False
  )
  river_street_deli = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    default=0.0,
    null=False,
    blank=False
  )
  clumpies = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    default=0.0,
    null=False,
    blank=False
  )
  coolidge_park = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    default=0.0,
    null=False,
    blank=False
  )
  renaissance_park = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    default=0.0,
    null=False,
    blank=False
  )
  hunter_art_museum = models.DecimalField(
    max_digits=24,
    decimal_places=14,
    default=0.0,
    null=False,
    blank=False
  )
