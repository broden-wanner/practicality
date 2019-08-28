from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from frontend.views import home

urlpatterns = [
    path('', home, name='home'),
    path('notes', home, name='home')
] + static('/', document_root=settings.STATIC_ROOT)