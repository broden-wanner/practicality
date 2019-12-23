from django.urls import path
from frontend.views import home

urlpatterns = [
    path('', home, name='home'),
    path('dashboard', home, name='home'),
    path('notes', home, name='home'),
    path('account', home, name='home'),
    path('projects', home, name='home'),
    path('projects/new', home, name='home'),
    path('habits', home, name='home'),
]
