from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.core.cache import cache
from rest_framework.decorators import api_view
import json
import math
import random
import geopy.distance

from .models import Cities, Landmarks, ChattanoogaLandmarkTimeRecords

# Create your views here.

####### ALL FOR ONE CONTROLLERS##################################

# PREMISE
# Users are randomly assigned five locations along with a common starting point
# The first location after the starting point is randomly assigned to avoid route collisions
# The ensuing selections are determined by an informal optimization algorithm: We assume each user completes his/her route from point A to point B within the typical time
# NOTE: This assumption is faulty because route times will change in real-time as participants in the same game & other simultaneous games beat the old record times
# If a user beats the old mark then he or she will be assigned a historically tougher route in terms of time (time considers the difficulty of a particular riddle & the distance between points)
# Users who beat target time for a particular route will trigger an update to that route's time record in the database
# If a user really struggles and takes too much time then he or she will obviously be assigned a historically easier problem
# Once a user reaches their target location within an acceptible margin of error, they will be assigned a new question until somebody wins

# PROBLEMS/AREAS OF IMPROVEMENT
# A lot of data has been cached to avoid excessive database calls although some of that same data is frequently updated. Hope is that Redis can handle the frequent updates
# Another problem is that the optimization "algorithm" does not evaluate the time data in sorted order because everything is stored in hash tables. However, that scenario was acceptible because we only iterate through five points max

# STORAGE/DATA
# Database Tables = Cities (Determine which landmarks are selected), Landmarks (Determine which questions get selected & used for location verification), Landmark Route Times (Chattanooga, Denver & SF - Feed to optimization problem for route selections)
# Cached Data = City id (Used to access landmarks), landmarks (Used for route selection & location verification), landmark_spot (Access landmark data in constant time; Used to find point B in route), riddle time (Players solve time that's used in optimization algorithm),
# target time (Historically best time used in optimization algorithm), old_landmark_spot (Access last solved landmark problem in constant time; Used to find point A in route)


# Distance formula between user coordinates & target coordinates
def distance_formula(city_latitude, city_longitude, user_latitude, user_longitude):
  return geopy.distance.geodesic((city_latitude, city_longitude), (user_latitude, user_longitude)).mi

# test
def home(request):
  return HttpResponse("It Works!!!")

@api_view(['PATCH'])
def user_entry(request):
  body_decoded = request.body.decode('utf-8')
  user_query = json.loads(body_decoded)
  try:
    # Check if user data is already cached; If not create a new cache entry with users public key
    assert request.session.get("public_key_address") == None
    assert user_query["public_key_address"] != None
    assert len(user_query["public_key_address"]) > 0
    request.session["public_key_address"] = user_query["public_key_address"]
    # Prepare game data for caching (See above description for details)
    cache.set(request.session["public_key_address"], {
        "city_id": None,
        "landmarks": [],
        "landmark_spot": None,
        "riddle_time": 0,
        "target_time": 0
    })
    # Confirm everything worked
    return JsonResponse({"result": True})
  except:
    return JsonResponse({"result": False})

@api_view(['PUT'])
def get_locations(request):
  try:
    # Confirm user public key is cached (Pprtipating in an active game)
    public_key_address = request.session.get("public_key_address")
    assert public_key_address != None
    # Grab local cache data for processing & updates
    local_cache_store = cache.get(public_key_address)
    # Confirm user has NOT been assigned locations
    assert(len(local_cache_store["landmarks"]) == 0)
    body_decoded = request.body.decode('utf-8')
    user_query = json.loads(body_decoded)
    # Grab user's latitude & longitude data to determine which city they're in
    assert user_query["latitude"] != None and user_query["longitude"] != None
    # select closest city for questions
    cities = Cities.objects.all()
    shortest_city_id = ''
    shortest_distance = 100000000
    for city in cities:
      city_distance = distance_formula(city.latitude, city.longitude, user_query['latitude'], user_query['longitude'])
      if city_distance < shortest_distance:
        shortest_city_id = city.city_id
        shortest_distance = city_distance
    # Gather landmarks for random selection and fill landmarks array in the user's cache location
    landmarks = list(Landmarks.objects.values('landmark_id', 'landmark_name', 'longitude', 'latitude', 'question', 'hint').filter(city_id__in=[shortest_city_id]).order_by('landmark_id'))
    # NOTE: Loops seven times instead of five once more locations are added
    local_cache_store["city_id"] = shortest_city_id
    local_cache_store["landmarks"].append(landmarks.pop(0))
    for query_len in range(6, 1, -1):
      spot = random.randint(0, query_len)
      local_cache_store["landmarks"].append(landmarks.pop(spot))
    # Set location to zero for initial starting point
    local_cache_store["landmark_spot"] = 0
    # Update cache
    cache.set(public_key_address, local_cache_store)
    # Remove landmark ids for data returned to client
    for item in local_cache_store["landmarks"]:
      del item["landmark_id"]
    return JsonResponse({
      "starting_point": local_cache_store["landmarks"][0],
      "landmark_one": local_cache_store["landmarks"][1],
      "landmark_two": local_cache_store["landmarks"][2],
      "landmark_three": local_cache_store["landmarks"][3],
      "landmark_four": local_cache_store["landmarks"][4],
      "landmark_five": local_cache_store["landmarks"][5],
    })
  except:
    return JsonResponse({})

@api_view(['GET'])
def user_question_request(request):
  try:
    # Confirm user public key is cached (partipating in an active game)
    public_key_address = request.session.get("public_key_address")
    assert public_key_address != None
    # Grab local cache data for processing & updates
    local_cache_store = cache.get(public_key_address)
    # If user is starting the game grab the starting location for next question
    if "old_landmark_spot" not in local_cache_store:
      local_cache_store["old_landmark_spot"] = local_cache_store["landmark_spot"]
    else:
      # If user has reached starting location then randomly assign one of the five pre-selected locations.
      # Updated cached target time for optimization algorithm to determine next question
      if len(local_cache_store["landmarks"]) == 6:
        local_cache_store["landmark_spot"] = random.randint(1, 5)
        landmarks = ChattanoogaLandmarkTimeRecords.objects.values(local_cache_store["landmarks"][local_cache_store["landmark_spot"]]["landmark_name"].replace(" ", "_").lower()).filter(starting_landmark_id__in=[local_cache_store["landmarks"][local_cache_store["old_landmark_spot"]]["landmark_id"]])
        local_cache_store["target_time"] = list(landmarks[0].values())[0]
      else:
        # Update starting location for question selection (Point A)
        local_cache_store["old_landmark_spot"] = local_cache_store["landmark_spot"]
        # Filter cached landmarks for locations that don't match the current starting location (Point A)
        open_landmarks = [local_cache_store["landmarks"][word_spot]["landmark_name"].replace(" ", "_").lower() for word_spot in range(0, len(local_cache_store["landmarks"])) if word_spot != local_cache_store["old_landmark_spot"]]
        # Query city time table for open landmarks (Not DRY but couldn't find a way to filter array for one call to values())
        if len(local_cache_store["landmarks"]) == 5:
          landmarks = ChattanoogaLandmarkTimeRecords.objects.values(open_landmarks[0], open_landmarks[1], open_landmarks[2], open_landmarks[3])
        elif len(local_cache_store["landmarks"]) == 4:
          landmarks = ChattanoogaLandmarkTimeRecords.objects.values(open_landmarks[0], open_landmarks[1], open_landmarks[2])
        elif len(local_cache_store["landmarks"]) == 3:
          landmarks = ChattanoogaLandmarkTimeRecords.objects.values(open_landmarks[0], open_landmarks[1])
        else:
          landmarks = ChattanoogaLandmarkTimeRecords.objects.values(open_landmarks[0])
        # Get all route times from landmark time records for current starting point
        landmarks = landmarks.get(starting_landmark_id=local_cache_store["landmarks"][local_cache_store["old_landmark_spot"]]["landmark_id"])
        # Get current surplus (if one exists) for time required to solve last riddle
        current_time_surplus = float(local_cache_store["target_time"]) - float(local_cache_store["riddle_time"])
        # Spot used to access next question
        optimal_spot = 0
        # Optimization "algorithm": Loop through all open landmarks & determine whether current surplus is less than expected completion time for current open landmark AND that the current open landmark time is less than the current optimum
        for spot in range(0, len(landmarks)):
          if current_time_surplus < landmarks[open_landmarks[spot]] and landmarks[open_landmarks[spot]] < landmarks[open_landmarks[optimal_spot]]:
            optimal_spot = spot
        # Assign new landmark spot after above processing. Adjustments might be required if old landmark spot equals the current optimum spot
        local_cache_store["landmark_spot"] = optimal_spot + (0 if local_cache_store["old_landmark_spot"] != optimal_spot else -1 if (optimal_spot + 1) == len(local_cache_store["landmarks"]) else 1)
        # Assign target time to optimum location's stored time
        local_cache_store["target_time"] = landmarks[open_landmarks[optimal_spot]]
    # Reset riddle time & update the cache
    local_cache_store["riddle_time"] = timezone.now()
    cache.set(public_key_address, local_cache_store)
    # Return question
    return JsonResponse({
      "question": local_cache_store["landmarks"][local_cache_store["landmark_spot"]]["question"]
    })
  except:
    return JsonResponse({})

@api_view(['PATCH'])
def user_location_check(request):
  try:
    # Confirm user public key is cached (partipating in an active game)
    public_key_address = request.session.get("public_key_address")
    assert public_key_address != None
    # Grab local cache data for processing & updates
    local_cache_store = cache.get(public_key_address)
    body_decoded = request.body.decode('utf-8')
    user_query = json.loads(body_decoded)
    # Grab user's latitude & longitude data to determine whether he or she is within range of the target point
    assert user_query["latitude"] != None and user_query["longitude"] != None
    landmark = Landmarks.objects.filter(question=local_cache_store["landmarks"][local_cache_store["landmark_spot"]]["question"])
    current_distance = (distance_formula(landmark[0].latitude, landmark[0].longitude, user_query['latitude'], user_query['longitude']))
    allowable_distance_difference = 0.01242740000000
    # If user if within range then execute necessary processing
    if current_distance < allowable_distance_difference:
      # If user is solving a riddle then check determine what processing is req'd
      if local_cache_store["target_time"] > 0:
        # Update riddle time to reflect completion. Used for next optimization algorithm round
        local_cache_store["riddle_time"] = float(timezone.now().timestamp() - local_cache_store["riddle_time"].timestamp()) / 60.0
        # If user beats the record time for the spec'd route then update the corresponding time record for that route
        if local_cache_store["riddle_time"] < local_cache_store["target_time"]:
          target_landmark = local_cache_store["landmarks"][local_cache_store["landmark_spot"]]["landmark_name"].replace(" ", "_").lower()
          target_record = ChattanoogaLandmarkTimeRecords.objects.get(starting_landmark_id=local_cache_store["landmarks"][local_cache_store["old_landmark_spot"]]["landmark_id"])
          setattr(target_record, target_landmark, local_cache_store["riddle_time"])
          target_record.save()
        # Remove current startin point
        local_cache_store["landmarks"].pop(local_cache_store["old_landmark_spot"])
        # Update landmark index if previous deletion affects accuracy
        if(local_cache_store["old_landmark_spot"] < local_cache_store["landmark_spot"]):
          local_cache_store["landmark_spot"] -= 1
        # Update Cache
        cache.set(public_key_address, local_cache_store)
      # Return zero if within range or winner if they've solved all five (eventually seven) riddles
      miles_from_destination = "winner" if len(local_cache_store["landmarks"]) == 1 else 0
    else:
      # Return distance from target location if out of range
      miles_from_destination = math.fabs(float(allowable_distance_difference) - current_distance)
    return JsonResponse({"miles_difference_or_status": miles_from_destination})
  except:
    return JsonResponse({})

@api_view(['GET'])
def clear_user_game_status(request):
  try:
    # Confirm user public key is cached (partipating in an active game)
    public_key_address = request.session.get("public_key_address")
    assert public_key_address != None
    # Clear cache for current game
    cache.delete(public_key_address)
    return JsonResponse({"Success": "You game is now over"})
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
