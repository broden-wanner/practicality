from django.urls import path
from rest_framework import routers
from notes.api import NoteViewSet

router = routers.DefaultRouter()
router.register('notes', NoteViewSet, 'notes')

urlpatterns = router.urls