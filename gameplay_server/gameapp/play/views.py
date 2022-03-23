from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
  # test adding true controller logic today (03/23/2022)
  return HttpResponse('Hello World')
