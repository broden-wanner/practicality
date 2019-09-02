from django.urls import path, include
from accounts.api import RegisterAPI, LoginAPI, UserAPI
from knox import views as know_views
from rest_framework import routers

urlpatterns = [
    path('', include('knox.urls')),
    path('register', RegisterAPI.as_view()),
    path('login', LoginAPI.as_view()),
    path('account', UserAPI.as_view()),
    path('logout', know_views.LogoutView.as_view(), name='knox_logout')
]