from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.db.models import Sum
from rest_framework.decorators import api_view
import json
import math
import random

from .models import Cities, Landmarks, Users, TimeRecords

# Create your views here.

# Distance formula between user coordinates & target coordinates
def distance_formula(city_latitude, city_longitude, user_latitude, user_longitude):
  return math.pow(math.fabs(city_latitude) - math.fabs(user_latitude), 2) + math.pow(math.fabs(city_longitude) - math.fabs(user_longitude), 2)

def update_visited_landmarks(user, landmark):
  # update visited landmarks for future question filtering
  if(user[0].completed_challenge_count == 0):
    user.update(landmark_one=landmark)
  elif(user[0].completed_challenge_count == 1):
    user.update(landmark_two=landmark)
  elif(user[0].completed_challenge_count == 2):
    user.update(landmark_three=landmark)
  elif(user[0].completed_challenge_count == 3):
    user.update(landmark_four=landmark)
  elif(user[0].completed_challenge_count == 4):
    user.update(landmark_five=landmark)
  elif(user[0].completed_challenge_count == 5):
    user.update(landmark_six=landmark)
  elif(user[0].completed_challenge_count == 6):
    user.update(landmark_seven=landmark)
  else:
    pass

# test
def home(request):
  return HttpResponse("It Works!!!")

@api_view(['POST', 'PUT'])
def user_entry(request):
  # extract user data for query
  body_decoded = request.body.decode('utf-8')
  user_query = json.loads(body_decoded)
  user = Users.objects.filter(public_key_address=user_query['public_key_address'])
  print(user)
  # create new user if none exists
  if len(user) == 0:
    user = Users.objects.create(public_key_address=user_query['public_key_address'])
  # update city_id to closest city & last_login to now
  else:
    user.update(last_login_time=timezone.now())

  # return city by closest coordinates to client
  return JsonResponse({"result": True})

@api_view(['PUT'])
def get_locations(request):
  body_decoded = request.body.decode('utf-8')
  user_query = json.loads(body_decoded)
  user = Users.objects.filter(public_key_address=user_query['public_key_address'])

   # select closest city for questions
  cities = Cities.objects.all()
  shortest_city_id = ''
  shortest_distance = 100000000
  # for city in cities:
  #   city_distance = distance_formula(city.latitude, city.longitude, user_query['latitude'], user_query['longitude'])
  #   if city_distance < shortest_distance:
  #     shortest_city_id = city.city_id
  #     shortest_distance = city_distance
  shortest_city_id = '15c98925-3583-4dfd-91f6-c13d3945fa3d'
  user.update(city_id=shortest_city_id)

  landmarks = Landmarks.objects.filter(city_id__in=[shortest_city_id]).values('landmark_name', 'longitude', 'latitude', 'question', 'hint')
  return JsonResponse({
    "starting_point": landmarks[0],
    "landmark_one": landmarks[1],
    "landmark_two": landmarks[2],
    "landmark_three": landmarks[3],
    "landmark_four": landmarks[4],
    "landmark_five": landmarks[5],
    "landmark_six": landmarks[6],
    "landmark_seven": landmarks[7],
  })


@api_view(['POST', 'PUT'])
def user_question_request(request):
  # extract user data for query
  body_decoded = request.body.decode('utf-8')
  user_account = json.loads(body_decoded)
  user = Users.objects.select_related('city').filter(public_key_address=user_account['public_key_address'])
  # extract visited landmarks to filter for unvisited locations
  visited_landmarks = [
    user[0].landmark_one,
    user[0].landmark_two,
    user[0].landmark_three,
    user[0].landmark_four,
    user[0].landmark_five,
    user[0].landmark_six,
    user[0].landmark_seven
  ]

  # filter for target landmarks: matching city_id, non-visisted, order by average completion time for heuristic
  landmarks = Landmarks.objects.filter(city_id__in=[user[0].city.city_id]).exclude(pk__in=[landmark.pk for landmark in visited_landmarks]).order_by('average_challenge_completion_time')
  print(landmarks)
  # Heuristic for question selection.
  target_landmark = None
  # Random selection for first push request
  if user[0].completed_challenge_count == 0:
    landmark_index = random.randint(0, 7)
    target_landmark = landmarks[landmark_index]
  # pick hardest question if current time plus hardest question time is less than target round time
  elif (user[0].active_game_time + landmarks[len(landmarks)-1].average_challenge_completion_time) < (float(user[0].completed_challenge_count) * float(user[0].city.average_game_completion_time) / 7.0):
    target_landmark = landmarks[len(landmarks)-1]
  # pick easiest question if current time plus easiest question time is greater than or equal to than target round time
  elif (user[0].active_game_time + landmarks[0].average_challenge_completion_time) >= (float(user[0].completed_challenge_count) * float(user[0].city.average_game_completion_time) / 7.0):
    target_landmark = landmarks[0]
  else:
    # heuristic: pick first landmark with average question time that fits within target time range
    landmark_index = 1
    while (float(user[0].active_game_time) + float(landmarks[landmark_index].average_challenge_completion_time)) < (float(user[0].city.average_game_completion_time) / 7.0):
      landmark_index += 1
    target_landmark = landmarks[landmark_index - 1]

  # update visited landmarks in database with selected target
  #update_visited_landmarks(user, target_landmark)

  # return question to client
  return JsonResponse({"question": target_landmark.question})

@api_view(['PUT'])
def user_location_check(request):
  # extract user data for query
  body_decoded = request.body.decode('utf-8')
  user_query = json.loads(body_decoded)
  user = Users.objects.select_related('city').filter(public_key_address=user_query['public_key_address'])

  # meters_from_destination: fail = user not found, winner = user solved all seven challenges, 0 = successfully solved riddle, else = distance in meters from target location
  meters_from_destination = "fail"

  if len(user) > 0:
    # calculate current distance between user (as of last push) and target location
    current_distance = distance_formula(user[0].city.latitude, user[0].city.longitude, user_query['latitude'], user_query['longitude'])
    # if in range update appropriate user & landmark table records before confirming success to client
    if current_distance < user[0].city.allowable_distance_difference:
      landmark = Landmarks.objects.filter(question=user_query['question'])
      if(len(landmark) > 0):
        # new total challenge completion time used as part of average challenge completion time calculation
        new_total_challenge_completion_time = float(timezone.now().timestamp() - user[0].last_login_time.timestamp())
        landmark_records = TimeRecords.objects.filter(landmark=landmark[0]).order_by('completion_time')
        landmark_records[0].completion_time=new_total_challenge_completion_time
        landmark_records[0].completion_date=timezone.now()
        landmark_records[0].landmark=landmark[0]
        landmark_records[0].save()
        new_average_challenge_completion_time = float(landmark_records.aggregate(Sum('completion_time'))['completion_time__sum'])  / 5.0
        landmark.update(
          average_challenge_completion_time=new_average_challenge_completion_time
        )
        # update user completed challenges for tracking purposes
        new_completed_challenge_count = user[0].completed_challenge_count + 1
        # update user active game time for heuristic calculation
        new_active_game_time = float(user[0].active_game_time) + float(timezone.now().timestamp() - user[0].last_login_time.timestamp())
        user.update(
          completed_challenge_count=new_completed_challenge_count,
          active_game_time=new_active_game_time,
          last_login_time=timezone.now()
        )
        # check if user has solved all seven challenges
        if(new_completed_challenge_count == 7):
          new_total_game_completion_time = user[0].active_game_time
          city_records = TimeRecords.objects.filter(city=user[0].city).order_by('completion_time')
          city_records[0].completion_time=new_total_game_completion_time
          city_records[0].completion_date=timezone.now()
          city_records[0].city=user[0].city
          city_records[0].save()
          new_average_game_completion_time = float(city_records.aggregate(Sum('completion_time'))['completion_time__sum'])  / 5.0
          user[0].city.average_game_completion_time=new_average_game_completion_time
          user[0].city.save()
          meters_from_destination = user[0].user_name
        # else just confirm success
        else:
          meters_from_destination = 0
    else:
      # return distance from target in meters for client
      # Convert to int/round to 0
      meters_from_destination = (float(user[0].city.allowable_distance_difference) - current_distance) * 1.1 / 0.00001

  # return status of push request
  return JsonResponse({"meters_difference_or_status": meters_from_destination})

@api_view(['PUT'])
def clear_user_game_status(request):
  try:
    # extract user data for query
    body_decoded = request.body.decode('utf-8')
    user_query = json.loads(body_decoded)
    user = Users.objects.select_related('city').filter(public_key_address=user_query['public_key_address'])
    # check if user has been found
    # if so clear apprpriate records fields & return true else return false
    result = False
    if(len(user) > 0):
      user.update(completed_challenge_count=0, active_game_time=0.0)
      result = True
    return JsonResponse({"result": result})
  except:
    return JsonResponse({"Fail": "An exception ocurred"}, status=500)

def error_handler_400(request, exception=None):
  return JsonResponse({
    'status_code': 400,
    'error': 'Could not process incoming request'
  }, status=400)

def error_handler_403(request, exception=None):
  return JsonResponse({
    'status_code': 403,
    'error': 'Can not authorize incoming request'
  }, status=403)

def error_handler_404(request, exception=None):
  return JsonResponse({
    'status_code': 404,
    'error': 'The resource was not found'
  }, status=404)

def error_handler_500(request):
  return JsonResponse({
    'status_code': 500,
    'error': 'Internal error. We messed up... not you!'
  }, status=500)
