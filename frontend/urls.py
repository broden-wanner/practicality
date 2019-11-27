from django.urls import path
from frontend.views import home

urlpatterns = [
    path('', home, name='home'),
    path('home', home, name='home'),
    path('notes', home, name='home'),
    path('account', home, name='home')
]