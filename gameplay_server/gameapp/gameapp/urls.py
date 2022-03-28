"""gameapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path

from play import views

# test adding true routes today (03/23/2022)
urlpatterns = [
    path('', views.home, name='home'),
    re_path('entry/?', views.user_entry, name='user_entry'),
    re_path('locations/?', views.get_locations, name='get_locations'),
    re_path('question/?', views.user_question_request, name='user_request'),
    re_path('check/?', views.user_location_check, name='user_check'),
    re_path('clear/?', views.clear_user_game_status, name='clear_user'),
    re_path('admin/', admin.site.urls),
]
