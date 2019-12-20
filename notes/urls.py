from django.urls import path
from rest_framework import routers
from notes.api import NoteViewSet, ProjectViewSet

router = routers.DefaultRouter()
router.register('notes', NoteViewSet, 'notes')
router.register('projects', ProjectViewSet, 'projects')

urlpatterns = router.urls