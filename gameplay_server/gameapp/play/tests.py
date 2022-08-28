from django.test import TestCase
from django.urls import resolve, reverse
from .views import home, user_entry, get_locations, user_question_request, user_location_check, clear_user_game_status

# Todo
# 1. Implement caching in django testing
# 2. Update existing test (http methods) with caching reflected
# 3. Tests:
#    A. Get right url (Done)
#    B. Get wrong url
#    C. Test correct view (Done)
#    D. Test incorrect view
#    E. Feed right data
#    F. Feed wrong data
#    G. Feed incomplete data


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
  def test_user_entry_url(self):
    user_entry_url = reverse("user_entry")
    body = '{"public_key_address": "test_address"}'
    response = self.client.patch(user_entry_url, body)
    self.assertEquals(response.status_code, 200)

  def test_user_entry_view(self):
    user_entry_check = resolve("/entry")
    self.assertEquals(user_entry_check.func, user_entry)

class GetLocationTests(TestCase):
  def setUp(self):
    self.user_entry_url = reverse("user_entry")
    self.body = '{"public_key_address": "test_address"}'
    self.client.patch(self.user_entry_url, self.body)

  def test_geolocation_url(self):
    geolocation_url = reverse("get_locations")
    response = self.client.put(geolocation_url)
    self.assertEquals(response.status_code, 200)

  def test_geolocation_view(self):
    geolocation_check = resolve("/locations")
    self.assertEquals(geolocation_check.func, get_locations)

class UserQuestionRequestTests(TestCase):
  def setUp(self):
    self.user_entry_url = reverse("user_entry")
    self.body = '{"public_key_address": "test_address"}'
    self.client.patch(self.user_entry_url, self.body)

  def test_user_question_request_url(self):
    user_question_request_url = reverse("user_request")
    response = self.client.get(user_question_request_url)
    self.assertEquals(response.status_code, 200)

  def test_user_question_request_view(self):
    user_question_request_check = resolve("/question")
    self.assertEquals(user_question_request_check.func, user_question_request)

class UserLocationCheckTests(TestCase):
  def setUp(self):
    self.user_entry_url = reverse("user_entry")
    self.body = '{"public_key_address": "test_address"}'
    self.client.patch(self.user_entry_url, self.body)
    self.question = "What restaurant originally occupied this spot before it gave way to a crumbling roof?"

  def test_user_location_check_url(self):
    user_location_check_url = reverse("user_check")
    body = '{"latitude": "35.05490819312549", "longitude": "-85.30943785558155"}'
    response = self.client.patch(user_location_check_url, body)
    self.assertEquals(response.status_code, 200)

  def test_user_location_check_view(self):
    user_location_checks = resolve("/check")
    self.assertEquals(user_location_checks.func, user_location_check)

class ClearUserGameStatus(TestCase):
  def setUp(self):
    self.user_entry_url = reverse("user_entry")
    self.body = '{"public_key_address": "test_address"}'
    self.client.patch(self.user_entry_url, self.body)

  def test_clear_user_game_status_url(self):
    clear_user_game_status_url = reverse("clear_user")
    response = self.client.get(clear_user_game_status_url)
    self.assertEquals(response.status_code, 200)

  def test_clear_user_game_status_view(self):
    clear_user_game_status_check = resolve("/clear")
    self.assertEquals(clear_user_game_status_check.func, clear_user_game_status)
