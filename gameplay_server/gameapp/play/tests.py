from django.test import TestCase
from django.urls import resolve, reverse
import json
from .views import home, user_entry, get_locations, user_question_request, user_location_check, clear_user_game_status

# Tests:
#  A. Get right url (Done)
#  B. Get wrong url
#  C. Test correct view (Done)
#  D. Test wrong view
#  E. Feed data
#  F. Feed wrong data
#  G. Feed incomplete data

# Create your tests here.
class HomeTests(TestCase):
  def test_home_url(self):
    home_url = reverse("home")
    response = self.client.get(home_url)
    self.assertEquals(response.status_code, 200)

  def test_home_view(self):
    home_check = resolve("/")
    self.assertEquals(home_check.func, home)

class UserEntryTests(TestCase):
  def setUp(self):
    self.user_entry_url = reverse("user_entry")
    self.body = '{"public_key_address": "test_address"}'

  def test_user_entry_url(self):
    response = self.client.patch(self.user_entry_url, self.body)
    self.assertEquals(response.status_code, 200)

  def test_wrong_user_entry_method(self):
    response = self.client.put(self.user_entry_url, self.body)
    self.assertEquals(response.status_code, 405)

  def test_user_entry_view(self):
    user_entry_check = resolve("/entry")
    self.assertEquals(user_entry_check.func, user_entry)

  def test_wrong_user_entry_view(self):
    user_entry_check = resolve("/locations")
    self.assertNotEquals(user_entry_check, user_entry)

  def test_user_entry_data(self):
    response = self.client.patch(self.user_entry_url, self.body)
    body_decoded = response.content.decode('utf-8')
    response = json.loads(body_decoded)
    self.assertEquals(response["result"], True)

  def test_wrong_user_entry_data(self):
    self.body = '{"wrong_data": "data"}'
    response = self.client.patch(self.user_entry_url, self.body)
    body_decoded = response.content.decode('utf-8')
    response = json.loads(body_decoded)
    self.assertEquals(response["result"], False)

  def test_incomplete_user_entry_data(self):
    self.body = '{"public_key_address": ""}'
    response = self.client.patch(self.user_entry_url, self.body)
    body_decoded = response.content.decode('utf-8')
    response = json.loads(body_decoded)
    self.assertEquals(response["result"], False)

class GetLocationTests(TestCase):
  fixtures = ['play/fixtures/afo_db.json']

  def setUp(self):
    self.user_entry_url = reverse("user_entry")
    self.body = '{"public_key_address": "test_address"}'
    self.client.patch(self.user_entry_url, self.body)
    self.geolocation_url = reverse("get_locations")
    self.body = '{"latitude": 35.055266, "longitude": -85.246967}'

  def test_geolocation_url(self):
    response = self.client.put(self.geolocation_url, self.body)
    self.assertEquals(response.status_code, 200)

  def test_wrong_geolocation_method(self):
    response = self.client.patch(self.geolocation_url, self.body)
    self.assertEquals(response.status_code, 405)

  def test_geolocation_view(self):
    geolocation_check = resolve("/locations")
    self.assertEquals(geolocation_check.func, get_locations)

  def test_wrong_geolocation_view(self):
    geolocation_check = resolve("/question")
    self.assertNotEquals(geolocation_check, user_entry)

  def test_gelocation_data(self):
    response = self.client.put(self.geolocation_url, self.body)
    body_decoded = response.content.decode('utf-8')
    response = json.loads(body_decoded)
    self.assertEquals(len(response), 6)
    self.assertEquals(response["starting_point"]["landmark_name"], "Game Start")

  def test_wrong_user_entry_data(self):
    self.body = '{"wrong_data": "data"}'
    response = self.client.put(self.geolocation_url, self.body)
    body_decoded = response.content.decode('utf-8')
    response = json.loads(body_decoded)
    self.assertEquals(response, {})

  def test_incomplete_user_entry_data(self):
    self.body = '{"longitude": -85.246967}'
    response = self.client.put(self.geolocation_url, self.body)
    body_decoded = response.content.decode('utf-8')
    response = json.loads(body_decoded)
    self.assertEquals(response, {})

class UserQuestionRequestTests(TestCase):
  fixtures = ['play/fixtures/afo_db.json']

  def setUp(self):
    self.user_entry_url = reverse("user_entry")
    self.body = '{"public_key_address": "test_address"}'
    self.client.patch(self.user_entry_url, self.body)
    self.geolocation_url = reverse("get_locations")
    self.body = '{"latitude": 35.055266, "longitude": -85.246967}'
    self.client.put(self.geolocation_url, self.body)
    self.user_question_request_url = reverse("user_request")

  def test_user_question_request_url(self):
    response = self.client.get(self.user_question_request_url)
    self.assertEquals(response.status_code, 200)

  def test_wrong_user_question_method(self):
    response = self.client.patch(self.geolocation_url)
    self.assertEquals(response.status_code, 405)

  def test_user_question_request_view(self):
    user_question_request_check = resolve("/question")
    self.assertEquals(user_question_request_check.func, user_question_request)

  def test_wrong_user_question_request_view(self):
    user_question_request_check = resolve("/check")
    self.assertNotEquals(user_question_request_check.func, user_question_request)

  def test_user_question_request_data(self):
    response = self.client.get(self.user_question_request_url)
    body_decoded = response.content.decode('utf-8')
    response = json.loads(body_decoded)
    self.assertEquals(response["question"], "This is the start of your scavenger hunt. Go to the given location and press check-in when you believe you are there. If correct a question will be displayed on a similar pop-up as this.")

class UserLocationCheckTests(TestCase):
  fixtures = ['play/fixtures/afo_db.json']

  def setUp(self):
    self.user_entry_url = reverse("user_entry")
    self.body = '{"public_key_address": "test_address"}'
    self.client.patch(self.user_entry_url, self.body)
    self.geolocation_url = reverse("get_locations")
    self.body = '{"latitude": 35.055266, "longitude": -85.246967}'
    self.client.put(self.geolocation_url, self.body)
    self.user_question_request_url = reverse("user_request")
    self.client.get(self.user_question_request_url)
    self.user_location_check_url = reverse("user_check")
    self.body = '{"latitude": "35.05817000000000", "longitude": "-85.30729600000000"}'

  def test_user_location_check_url(self):
    response = self.client.patch(self.user_location_check_url, self.body)
    self.assertEquals(response.status_code, 200)

  def test_wrong_user_location_check_method(self):
    response = self.client.put(self.user_location_check_url)
    self.assertEquals(response.status_code, 405)

  def test_user_location_check_view(self):
    user_location_checks = resolve("/check")
    self.assertEquals(user_location_checks.func, user_location_check)

  def test_wrong_user_location_check_view(self):
    user_location_check = resolve("/clear")
    self.assertNotEquals(user_location_check.func, user_location_check)

  def test_user_location_check_data(self):
    response = self.client.patch(self.user_location_check_url, self.body)
    body_decoded = response.content.decode('utf-8')
    response = json.loads(body_decoded)
    self.assertEquals(response["miles_difference_or_status"], 0)

  def test_user_location_check_data2(self):
    self.body = '{"latitude": "35.05817000000000", "longitude": "-86"}'
    response = self.client.patch(self.user_location_check_url, self.body)
    body_decoded = response.content.decode('utf-8')
    response = json.loads(body_decoded)
    self.assertEquals(response["miles_difference_or_status"], 39.25249626840428)

  def test_wrong_user_location_check_data_view(self):
    self.body = '{"wrong_data": "data"}'
    response = self.client.patch(self.user_location_check_url, self.body)
    body_decoded = response.content.decode('utf-8')
    response = json.loads(body_decoded)
    self.assertEquals(response, {})

  def test_incomplete_user_location_check_data_view(self):
    self.body = '{"latitude": "35.05817000000000"}'
    response = self.client.patch(self.user_location_check_url, self.body)
    body_decoded = response.content.decode('utf-8')
    response = json.loads(body_decoded)
    self.assertEquals(response, {})

class ClearUserGameStatus(TestCase):
  def setUp(self):
    self.user_entry_url = reverse("user_entry")
    self.body = '{"public_key_address": "test_address"}'
    self.client.patch(self.user_entry_url, self.body)
    self.clear_user_game_status_url = reverse("clear_user")

  def test_clear_user_game_status_url(self):
    response = self.client.get(self.clear_user_game_status_url)
    self.assertEquals(response.status_code, 200)

  def test_clear_user_game_status_view(self):
    clear_user_game_status_check = resolve("/clear")
    self.assertEquals(clear_user_game_status_check.func, clear_user_game_status)

  def test_wrong_clear_user_game_status_view(self):
    clear_user_game_status_check = resolve("/user_entry")
    self.assertNotEquals(clear_user_game_status_check.func, clear_user_game_status)
