from django.urls import path
from rest_framework import routers
from backend.api import NoteViewSet, ProjectViewSet, SubtaskViewSet

router = routers.DefaultRouter()
router.register('notes', NoteViewSet, 'notes')
router.register('projects', ProjectViewSet, 'projects')

urlpatterns = router.urls
urlpatterns += [
    path('subtasks/<int:pk>/', SubtaskViewSet.as_view({'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}))
]